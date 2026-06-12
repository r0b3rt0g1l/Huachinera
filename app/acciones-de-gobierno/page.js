import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import { municipalConfig } from "@/lib/municipalConfig";
import { getNoticiasAll, comunicados } from "@/lib/noticiasService";
import { NoticiasTabs } from "@/components/noticias/NoticiasTabs";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Acciones de Gobierno",
  description: `Últimas noticias y comunicados oficiales del ${municipalConfig.identidad.nombreCompleto}. Mantente al día con las acciones, obras y avisos de la Administración ${municipalConfig.identidad.administracion}.`,
  path: "/acciones-de-gobierno",
});

export default async function AccionesDeGobiernoPage() {
  const noticias = await getNoticiasAll();

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Acciones de Gobierno", path: "/acciones-de-gobierno" }]} />
      <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Sala de prensa
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Acciones de Gobierno
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--color-text-secondary)] md:text-lg">
            Noticias y comunicados oficiales de la Administración{" "}
            {municipalConfig.identidad.administracion} del{" "}
            {municipalConfig.identidad.nombreCompleto}.
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-14">
        <NoticiasTabs noticias={noticias} comunicados={comunicados} />
      </section>
    </main>
  );
}
