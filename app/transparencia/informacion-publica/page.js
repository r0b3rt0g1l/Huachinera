import { ShieldCheck, Building2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import { municipalConfig } from "@/lib/municipalConfig";
import { InformacionPublicaForm } from "@/components/transparencia/InformacionPublicaForm";
import { ComoFunciona } from "@/components/transparencia/ComoFunciona";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Información Pública",
  description: `Solicita información pública al ${municipalConfig.identidad.nombreCompleto} a través de la Unidad de Transparencia Municipal. Formulario seguro y respuesta en plazos legales.`,
  path: "/transparencia/informacion-publica",
});

export default function InformacionPublicaPage() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const { contacto } = municipalConfig;

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Transparencia", path: "/transparencia" }, { name: "Información Pública", path: "/transparencia/informacion-publica" }]} />
      <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Acceso a la información
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Información Pública
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--color-text-secondary)] md:text-lg">
            El acceso a la información pública es un derecho humano garantizado
            por la Constitución y las leyes federales y estatales. Cualquier
            persona puede solicitar información en posesión del{" "}
            {municipalConfig.identidad.nombreCompleto} a través de este
            formulario.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-5 py-4 shadow-[var(--shadow-card)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-guinda)]/10 text-[var(--color-guinda)]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="text-sm leading-tight">
              <p className="font-semibold text-[var(--color-text)]">
                Tu solicitud es enviada de forma segura
              </p>
              <p className="text-[var(--color-text-secondary)]">
                Procesada por la Unidad de Transparencia Municipal.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Formulario de solicitud
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">
              Los campos marcados con asterisco (*) son obligatorios. Recibirás
              acuse y respuesta en la modalidad seleccionada conforme a los
              plazos previstos por la ley.
            </p>
            <div className="mt-6">
              <InformacionPublicaForm accessKey={accessKey} />
            </div>
          </div>

          <aside className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
              Unidad de Transparencia
            </p>
            <h3 className="mt-2 font-display text-lg font-bold leading-snug">
              ¿Cómo te atendemos?
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Building2
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-guinda)]"
                />
                <span className="text-[var(--color-text-secondary)]">
                  {contacto.direccionCompleta}
                </span>
              </li>
              {/* Política Northa: sin tel:/mailto:. Las solicitudes se hacen por
                  el formulario de esta página o la Plataforma Nacional. */}
            </ul>
            <p className="mt-5 rounded-lg bg-[var(--color-bg)] p-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
              Datos del titular de la Unidad de Transparencia pendientes de
              publicación oficial. La información se actualizará tan pronto sea
              designada formalmente.
            </p>
          </aside>
        </div>
      </section>

      <ComoFunciona />
    </main>
  );
}
