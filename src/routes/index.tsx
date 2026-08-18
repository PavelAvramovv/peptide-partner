import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FlaskConical, Truck, BadgeCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ProductGrid } from "@/components/product-grid";
import heroPen from "@/assets/hero-pen.jpg";

const title = "Peptide Power BG — пептиди и добавки за изследване";
const description =
  "Онлайн магазин за изследователски пептиди, стакове и хранителни добавки с анализни сертификати и бърза доставка в България.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const specs = [
  { value: "5 / 10 / 15 mg", label: "Налични изследователски варианти" },
  { value: "SubQ", label: "Предварително смесена писалка" },
  { value: "33G", label: "Включени игли" },
];

const trust = [
  { icon: FlaskConical, title: "≥99% чистота", text: "HPLC и MS анализ за всяка партида" },
  { icon: ShieldCheck, title: "Сертификати", text: "Публичен CoA към всеки продукт" },
  { icon: Truck, title: "Доставка 24-48ч", text: "Охладена и дискретна опаковка" },
  { icon: BadgeCheck, title: "EU производство", text: "GMP лаборатории в Европа" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                GLP-3R
                <span className="block text-primary">Метаболитно</span>
                Изследване
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                GLP-3R е изследователски агонист на три рецептора, проучван в модели за
                метаболизъм, телесен състав и чернодробна мазнина. Предлага се като
                стабилизирана, предварително смесена писалка за изследователски протоколи.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {specs.map((s) => (
                  <div
                    key={s.value}
                    className="rounded-xl border border-border bg-card p-4"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <p className="text-lg font-bold text-ink">{s.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  Виж продукта
                </a>
                <a
                  href="#shop"
                  className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-secondary"
                >
                  Всички продукти
                </a>
              </div>
            </div>

            <div
              className="overflow-hidden rounded-3xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-float)" }}
            >
              <img
                src={heroPen}
                alt="Изследователска писалка с пептид и стерилни консумативи"
                width={1200}
                height={1008}
                className="w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map(({ icon: Icon, title: t, text }) => (
              <div key={t} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t}</p>
                  <p className="text-xs text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ProductGrid />

        <section className="border-y border-border bg-secondary/50">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Присъедини се към нашия бюлетин
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Нови протоколи, партидни анализи и промоции — веднъж месечно.
            </p>
            <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="твоят имейл"
                className="h-11 flex-1 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="h-11 rounded-lg px-6 text-sm font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-brand)" }}
              >
                Абонирай се
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-extrabold text-primary-foreground">
              PEPTIDE<span className="text-primary-foreground/60">.Power</span>
            </p>
            <p className="mt-3 text-sm text-primary-foreground/60">
              Продуктите са предназначени единствено за лабораторни изследвания. Не са за
              човешка употреба.
            </p>
          </div>
          {[
            { h: "Магазин", l: ["Стакове", "Единични пептиди", "Добавки", "Консумативи"] },
            { h: "Помощ", l: ["Доставка", "Връщане", "Плащане", "Контакти"] },
            { h: "Компания", l: ["За нас", "CoA сертификати", "Блог", "Условия"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-sm font-semibold text-primary-foreground">{col.h}</p>
              <ul className="mt-3 space-y-2">
                {col.l.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Peptide Power BG
        </div>
      </footer>
    </div>
  );
}
