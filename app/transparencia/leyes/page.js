import { Scale } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import { municipalConfig } from "@/lib/municipalConfig";
import { getDocumentosFromCMS } from "@/lib/cms";
import { LeyCard } from "@/components/transparencia/LeyCard";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Leyes y Reglamentos",
  description: `Marco normativo del ${municipalConfig.identidad.nombreOficial} y del derecho de acceso a la información pública aplicable al Gobierno Municipal: reglamentos municipales, leyes federales y estatales.`,
  path: "/transparencia/leyes",
});

function toLeyShape(doc) {
  return { ...doc, archivo: doc.url };
}

export default async function LeyesPage() {
  const documentos = (await getDocumentosFromCMS()) ?? [];

  const reglamentosMunicipales = documentos
    .filter((d) => d.ambito === "MUNICIPAL")
    .map(toLeyShape);
  const marcoFederalEstatal = documentos
    .filter((d) => d.ambito === "FEDERAL" || d.ambito === "ESTATAL")
    .map(toLeyShape);

  const sinReglamentos = reglamentosMunicipales.length === 0;
  const sinMarcoExterno = marcoFederalEstatal.length === 0;

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Transparencia", path: "/transparencia" }, { name: "Leyes y Reglamentos", path: "/transparencia/leyes" }]} />
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-guinda)]/20 bg-[var(--color-guinda)]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            Marco normativo
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Leyes y Reglamentos Municipales
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--color-text-secondary)] md:text-lg">
            Marco normativo del {municipalConfig.identidad.nombreOficial}:
            reglamentos municipales, ordenamientos del Cabildo y leyes aplicables
            al ejercicio del gobierno municipal y al derecho de acceso a la
            información pública. Todos los documentos se visualizan directamente
            en este portal.
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Reglamentos municipales
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Normativa vigente del H. Ayuntamiento
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-secondary)]">
            Reglamentos, bandos y códigos que rigen la organización política,
            administrativa y de servicios del {municipalConfig.identidad.nombreOficial}.
          </p>
        </header>

        {sinReglamentos ? (
          <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">
            Aún no hay documentos publicados.
          </p>
        ) : (
          <ul className="grid gap-6">
            {reglamentosMunicipales.map((reglamento) => (
              <li key={reglamento.id}>
                <LeyCard ley={reglamento} />
              </li>
            ))}
          </ul>
        )}

        <header className="mt-16 mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Marco federal y estatal
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Leyes aplicables de transparencia
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-secondary)]">
            Leyes que regulan el ejercicio del derecho de acceso a la
            información pública aplicables al Gobierno Municipal.
          </p>
        </header>

        {sinMarcoExterno ? (
          <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">
            Aún no hay documentos publicados.
          </p>
        ) : (
          <ul className="grid gap-6">
            {marcoFederalEstatal.map((ley) => (
              <li key={ley.id}>
                <LeyCard ley={ley} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
