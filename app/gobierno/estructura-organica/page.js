import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { cabildo as cabildoFallback } from "@/lib/cabildo";
import { getCabildoFromCMS } from "@/lib/cms";
import { DirectorioGrid } from "@/components/gobierno/DirectorioGrid";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Estructura Orgánica",
  description: `Estructura institucional del ${municipalConfig.identidad.nombreCompleto}: Cabildo, Sindicatura, Regidurías y Presidencia del DIF Municipal. Administración ${municipalConfig.identidad.administracion}.`,
  path: "/gobierno/estructura-organica",
});

export default async function EstructuraOrganicaPage() {
  const cms = await getCabildoFromCMS();
  const lista = cms && cms.length > 0 ? cms : cabildoFallback;

  return (
    <main className="flex flex-1 flex-col">
      <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Estructura institucional
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Estructura Orgánica
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--color-text-secondary)] md:text-lg">
            Personas que integran el Cabildo y la Presidencia del DIF Municipal
            del {municipalConfig.identidad.nombreCompleto} durante la
            Administración {municipalConfig.identidad.administracion}. Las
            direcciones generales y de área se publicarán conforme a las
            designaciones oficiales.
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <DirectorioGrid people={lista} />
      </section>
    </main>
  );
}
