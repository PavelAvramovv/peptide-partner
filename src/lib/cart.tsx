import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  qty: number;
};

export type ShippingMethod = {
  id: string;
  label: string;
  note: string;
  price: number;
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: "office", label: "Куриер до офис", note: "1-2 работни дни", price: 4.9 },
  { id: "address", label: "Куриер до адрес", note: "1-2 работни дни", price: 6.9 },
  { id: "express", label: "Експресна доставка", note: "до 24 часа", price: 12.9 },
];

export const FREE_SHIPPING_THRESHOLD = 150;

type Promo = {
  code: string;
  label: string;
  percent?: number;
  amount?: number;
  freeShipping?: boolean;
  minSubtotal?: number;
};

const PROMOS: Promo[] = [
  { code: "PEPTIDE10", label: "-10% от поръчката", percent: 10 },
  { code: "WELCOME15", label: "-15% за нови клиенти", percent: 15, minSubtotal: 100 },
  { code: "FREESHIP", label: "Безплатна доставка", freeShipping: true },
  { code: "STACK25", label: "-25,00 € при поръчка над 300 €", amount: 25, minSubtotal: 300 },
];

const STORAGE_KEY = "peptide-cart-v1";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  discount: number;
  shippingMethod: ShippingMethod;
  setShippingId: (id: string) => void;
  shippingCost: number;
  total: number;
  promo: Promo | null;
  promoError: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [shippingId, setShippingId] = useState(SHIPPING_METHODS[0].id);
  const [promo, setPromo] = useState<Promo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { items?: CartItem[]; shippingId?: string; promo?: string };
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.shippingId) setShippingId(parsed.shippingId);
        if (parsed.promo) {
          const found = PROMOS.find((p) => p.code === parsed.promo);
          if (found) setPromo(found);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items, shippingId, promo: promo?.code ?? null }),
      );
    } catch {
      /* ignore */
    }
  }, [items, shippingId, promo]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 99) } : i)),
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setPromo(null);
    setPromoError(null);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  const discount = useMemo(() => {
    if (!promo) return 0;
    if (promo.minSubtotal && subtotal < promo.minSubtotal) return 0;
    if (promo.percent) return (subtotal * promo.percent) / 100;
    if (promo.amount) return Math.min(promo.amount, subtotal);
    return 0;
  }, [promo, subtotal]);

  const shippingMethod =
    SHIPPING_METHODS.find((m) => m.id === shippingId) ?? SHIPPING_METHODS[0];

  const shippingCost = useMemo(() => {
    if (items.length === 0) return 0;
    const base = subtotal - discount;
    if (promo?.freeShipping) return 0;
    if (base >= FREE_SHIPPING_THRESHOLD) return 0;
    return shippingMethod.price;
  }, [items.length, subtotal, discount, promo, shippingMethod]);

  const applyPromo = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase();
      const found = PROMOS.find((p) => p.code === normalized);
      if (!found) {
        setPromoError("Невалиден промо код");
        return false;
      }
      if (found.minSubtotal && subtotal < found.minSubtotal) {
        setPromoError(`Кодът важи при поръчка над ${found.minSubtotal} €`);
        return false;
      }
      setPromo(found);
      setPromoError(null);
      return true;
    },
    [subtotal],
  );

  const removePromo = useCallback(() => {
    setPromo(null);
    setPromoError(null);
  }, []);

  const value: CartState = {
    items,
    isOpen,
    setOpen,
    addItem,
    removeItem,
    setQty,
    clear,
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal,
    discount,
    shippingMethod,
    setShippingId,
    shippingCost,
    total: Math.max(0, subtotal - discount) + shippingCost,
    promo,
    promoError,
    applyPromo,
    removePromo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const eur = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;