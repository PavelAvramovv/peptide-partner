import { useState } from "react";
import { Minus, Plus, Trash2, Tag, Truck, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  useCart,
  eur,
  SHIPPING_METHODS,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/cart";

export function CartDrawer() {
  const cart = useCart();
  const [code, setCode] = useState("");
  const [placed, setPlaced] = useState(false);

  const afterDiscount = Math.max(0, cart.subtotal - cart.discount);
  const missingForFree = FREE_SHIPPING_THRESHOLD - afterDiscount;

  return (
    <Sheet
      open={cart.isOpen}
      onOpenChange={(o) => {
        cart.setOpen(o);
        if (!o) setPlaced(false);
      }}
    >
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="flex items-center gap-2 text-ink">
            <ShoppingBag className="h-5 w-5 text-primary" /> Количка ({cart.count})
          </SheetTitle>
        </SheetHeader>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="text-lg font-semibold text-ink">Благодарим за поръчката!</p>
            <p className="text-sm text-muted-foreground">
              Ще получиш имейл с потвърждение и номер за проследяване.
            </p>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <p className="text-sm font-semibold text-ink">Количката е празна</p>
            <p className="text-xs text-muted-foreground">
              Добави стак, за да продължиш към поръчката.
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <ul className="space-y-3">
              {cart.items.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-xl border border-border p-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="h-16 w-16 shrink-0 rounded-lg bg-secondary/60 object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{eur(item.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        aria-label="Намали количеството"
                        onClick={() => cart.setQty(item.id, item.qty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-ink">
                        {item.qty}
                      </span>
                      <button
                        aria-label="Увеличи количеството"
                        onClick={() => cart.setQty(item.id, item.qty + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        aria-label="Премахни продукта"
                        onClick={() => cart.removeItem(item.id)}
                        className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-ink">{eur(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-border p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink">
                <Tag className="h-4 w-4 text-primary" /> Промо код
              </p>
              {cart.promo ? (
                <div className="mt-2 flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
                  <span className="text-sm font-semibold text-secondary-foreground">
                    {cart.promo.code} · {cart.promo.label}
                  </span>
                  <button
                    onClick={cart.removePromo}
                    className="text-xs font-semibold text-muted-foreground hover:text-destructive"
                  >
                    Премахни
                  </button>
                </div>
              ) : (
                <form
                  className="mt-2 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (cart.applyPromo(code)) setCode("");
                  }}
                >
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="напр. PEPTIDE10"
                    className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm uppercase outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Приложи
                  </button>
                </form>
              )}
              {cart.promoError && (
                <p className="mt-2 text-xs font-medium text-destructive">{cart.promoError}</p>
              )}
            </div>

            <div className="rounded-xl border border-border p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink">
                <Truck className="h-4 w-4 text-primary" /> Доставка
              </p>
              <div className="mt-2 space-y-2">
                {SHIPPING_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 text-sm transition-colors ${
                      cart.shippingMethod.id === m.id
                        ? "border-primary bg-secondary"
                        : "border-border hover:bg-secondary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      className="accent-primary"
                      checked={cart.shippingMethod.id === m.id}
                      onChange={() => cart.setShippingId(m.id)}
                    />
                    <span className="flex-1">
                      <span className="block font-medium text-ink">{m.label}</span>
                      <span className="block text-xs text-muted-foreground">{m.note}</span>
                    </span>
                    <span className="text-sm font-semibold text-ink">{eur(m.price)}</span>
                  </label>
                ))}
              </div>
              {missingForFree > 0 ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Добави още {eur(missingForFree)} за безплатна доставка.
                </p>
              ) : (
                <p className="mt-2 text-xs font-semibold text-accent">
                  Имаш безплатна доставка 🎉
                </p>
              )}
            </div>
          </div>
        )}

        {!placed && cart.items.length > 0 && (
          <SheetFooter className="gap-2 border-t border-border p-4">
            <dl className="w-full space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Междинна сума</dt>
                <dd className="text-ink">{eur(cart.subtotal)}</dd>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Отстъпка</dt>
                  <dd className="font-semibold text-deal">-{eur(cart.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Доставка</dt>
                <dd className="text-ink">
                  {cart.shippingCost === 0 ? "Безплатна" : eur(cart.shippingCost)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                <dt className="text-ink">Общо</dt>
                <dd className="text-ink">{eur(cart.total)}</dd>
              </div>
            </dl>
            <button
              onClick={() => {
                setPlaced(true);
                cart.clear();
              }}
              className="h-12 w-full rounded-lg text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              style={{ background: "var(--gradient-brand)" }}
            >
              Завърши поръчката
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}