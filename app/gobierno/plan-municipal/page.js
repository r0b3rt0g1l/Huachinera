import { Construction, Target, Users, Sprout, Heart, Building2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";

export const metadata = buildMetadata({
  title: "Plan Municipal de Desarrollo",
  description: `Ejes rectores, programas y compromisos del Plan Municipal de Desarrollo del ${municipalConfig.identidad.nombreCompleto} para el periodo ${municipalConfig.identidad.administracion}.`,
  path: "/gobierno/plan-municipal",
});

const ejes = [
  {
    icon: Building2,
    titulo: "Gobierno honesto y eficiente",
    descripcion:
      "Transparencia, rendición de cuentas y modernización administrativa para construir un gobierno cercano a la ciudadanía.",
  },
  {
    icon: Sprout,
    titulo: "Desarrollo económico sostenible",
    descripcion:
      "Impulso al campo, ganadería, comercio local, gastronomía tradicional y turismo serrano como motores de la economía municipal.",
  },
  {
    icon: Heart,
    titulo: "Bienestar social",
    descripcion:
      "Salud comunitaria, educación, deporte, cultura y atención a grupos en situación de vulnerabilidad a través del Sistema DIF.",
  },
  {
    icon: Target,
    titulo: "Obra pública y servicios",
    descripcion:
      "Caminos rurales, agua potable, alumbrado público, manejo de residuos y mantenimiento de la infraestructura municipal.",
  },
  {
    icon: Users,
    titulo: "Seguridad y protección civil",
    descripcion:
      "Seguridad ciudadana, prevención de riesgos y atención de emergencias en la cabecera y las localidades de la sierra.",
  },
];

export default function PlanMunicipalPage() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Administración {municipalConfig.identidad.administracion}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Plan Municipal de Desarrollo
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--color-text-secondary)] md:text-lg">
            Documento rector que define la visión, los ejes estratégicos y los
            compromisos del {municipalConfig.identidad.nombreCompleto} para el
            periodo {municipalConfig.identidad.administracion}.
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="rounded-2xl border border-[var(--color-dorado)]/30 bg-[var(--color-dorado-50)]/40 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-guinda)] text-white">
              <Construction className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-[var(--color-text)]">
                Documento en proceso de publicación
              </p>
              <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">
                El Plan Municipal de Desarrollo de la Administración 2024-2027
                está en proceso de validación oficial y será publicado en este
                portal una vez aprobado por el Cabildo. A continuación se
                muestran los ejes estratégicos identificados para orientar el
                trabajo del Ayuntamiento.
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Ejes estratégicos
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ejes.map((eje, i) => (
            <li
              key={eje.titulo}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-guinda)]/10 text-[var(--color-guinda)]">
                  <eje.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Eje {i + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold leading-snug text-[var(--color-text)]">
                {eje.titulo}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {eje.descripcion}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
