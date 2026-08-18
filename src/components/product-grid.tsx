import stackA from "@/assets/stack-a.jpg";
import stackB from "@/assets/stack-b.jpg";
import stackC from "@/assets/stack-c.jpg";

type Product = {
  name: string;
  tag: "STARTER" | "ADVANCED";
  old: number;
  price: number;
  img: string;
  discount: string;
};

const products: Product[] = [
  { name: "Bioregulator – Start", tag: "STARTER", old: 166, price: 141, img: stackA, discount: "-15%" },
  { name: "Bioregulator – Advanced", tag: "ADVANCED", old: 343, price: 257, img: stackC, discount: "-25%" },
  { name: "Brain – Start", tag: "STARTER", old: 209, price: 178, img: stackB, discount: "-15%" },
  { name: "Brain – Advanced", tag: "ADVANCED", old: 404, price: 303, img: stackC, discount: "-25%" },
  { name: "Cell Renewal – Start", tag: "STARTER", old: 359, price: 305, img: stackA, discount: "-15%" },
  { name: "Cell Renewal – Advanced", tag: "ADVANCED", old: 678, price: 509, img: stackC, discount: "-25%" },
  { name: "Energy – Start", tag: "STARTER", old: 420, price: 357, img: stackB, discount: "-15%" },
  { name: "Energy – Advanced", tag: "ADVANCED", old: 682, price: 512, img: stackA, discount: "-25%" },
];

const eur = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

export function ProductGrid() {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Протоколи</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Изследователски стакове
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          Готови комбинации за метаболизъм, когниция, възстановяване и енергия — с включени
          консумативи и анализен сертификат.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {products.map((p) => (
          <article
            key={p.name}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <div className="relative bg-secondary/60 p-4">
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  p.tag === "STARTER"
                    ? "bg-accent text-accent-foreground"
                    : "bg-deal text-deal-foreground"
                }`}
              >
                Стак · {p.tag}
              </span>
              <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {p.discount}
              </span>
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                width={900}
                height={900}
                className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2 p-4 text-center">
              <h3 className="text-sm font-semibold text-ink">{p.name}</h3>
              <p className="text-sm">
                <span className="text-muted-foreground line-through">{eur(p.old)}</span>{" "}
                <span className="font-bold text-ink">{eur(p.price)}</span>
              </p>
              <button className="w-full rounded-lg border border-primary/30 bg-secondary py-2 text-xs font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                Добави в количката
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}