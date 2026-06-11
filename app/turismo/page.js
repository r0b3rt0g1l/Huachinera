import { UtensilsCrossed, Hammer } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { atractivos, gastronomia, artesanias } from "@/lib/atractivos";
import { AtractivoCard } from "@/components/turismo/AtractivoCard";

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: "Turismo",
  description: `Descubre los atractivos turísticos del ${municipalConfig.identidad.nombreOficial}.`,
  path: "/turismo",
});

export default function TurismoPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-label="Bienvenida turismo"
        className="relative isolate overflow-hidden bg-[var(--color-guinda-deep)] text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_25%_30%,rgba(212,160,23,0.55)_0,transparent_50%),radial-gradient(circle_at_75%_70%,white_0,transparent_50%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-cream)] backdrop-blur-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-dorado)]" />
              Sierra Madre Occidental
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[var(--color-cream)] md:text-5xl lg:text-6xl">
              Descubre {municipalConfig.identidad.nombreCorto}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--color-cream)]/90 md:text-lg">
              Atractivos, patrimonio y entorno natural del municipio (en
              preparación).
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        {atractivos.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">
            El inventario turístico está en preparación.
          </p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {atractivos.map((atractivo) => (
              <li key={atractivo.slug} className="flex">
                <AtractivoCard atractivo={atractivo} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        aria-label="Gastronomía y artesanías"
        className="bg-[var(--color-bg)] border-t border-[var(--color-border)]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-guinda)]/10 text-[var(--color-guinda)]">
                <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
                  Sabores de {municipalConfig.identidad.nombreCorto}
                </p>
                <h2 className="font-display text-xl font-bold text-[var(--color-text)] md:text-2xl">
                  Gastronomía tradicional
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Platillos típicos
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {gastronomia.platillos.map((p) => (
                    <li
                      key={p}
                      className="rounded-full bg-[var(--color-bg)] px-3 py-1 text-sm text-[var(--color-text)]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Conservas y dulces
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {gastronomia.dulces.map((d) => (
                    <li
                      key={d}
                      className="rounded-full bg-[var(--color-dorado)]/10 px-3 py-1 text-sm text-[var(--color-dorado-700)]"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-dorado)]/15 text-[var(--color-dorado-700)]">
                <Hammer className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-dorado-700)]">
                  Hecho a mano
                </p>
                <h2 className="font-display text-xl font-bold text-[var(--color-text)] md:text-2xl">
                  Artesanías locales
                </h2>
              </div>
            </div>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              Las y los artesanos de {municipalConfig.identidad.nombreCorto}{" "}
              mantienen vivas las técnicas tradicionales locales:
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {artesanias.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm font-medium text-[var(--color-text)]"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-dorado)]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
