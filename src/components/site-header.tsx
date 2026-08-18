import { Search, ShoppingBag, Heart, Menu } from "lucide-react";

const nav = ["Начало", "Магазин", "Технология", "Сертификати", "ЧЗВ", "За нас", "Контакти"];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4">
        <a href="#" className="text-2xl font-extrabold tracking-tight text-ink">
          PEPTIDE<span className="text-primary">.Power</span>
        </a>
        <div className="order-3 flex w-full items-center overflow-hidden rounded-xl border border-border md:order-2 md:w-auto md:flex-1">
          <input
            aria-label="Търсене на продукти"
            placeholder="Търсене на продукти"
            className="h-11 w-full bg-background px-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="flex h-11 w-12 items-center justify-center bg-primary text-primary-foreground transition-opacity hover:opacity-90">
            <Search className="h-4 w-4" />
          </button>
        </div>
        <div className="order-2 ml-auto flex items-center gap-5 md:order-3">
          <button className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary sm:flex">
            <Heart className="h-5 w-5" /> Желани
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ShoppingBag className="h-5 w-5" />
            <span>0,00 €</span>
          </button>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4">
          <button className="my-2 flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            <Menu className="h-4 w-4" /> Категории
          </button>
          <nav className="flex items-center gap-6 px-4">
            {nav.map((item) => (
              <a
                key={item}
                href="#"
                className="whitespace-nowrap py-3 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}