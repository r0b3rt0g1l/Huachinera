import { MessageSquare } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import { municipalConfig } from "@/lib/municipalConfig";
import { ContactoForm } from "@/components/contacto/ContactoForm";
import { ContactoInfo } from "@/components/contacto/ContactoInfo";
import { MapaEmbed } from "@/components/turismo/MapaEmbed";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Contacto",
  description: `Contacta al ${municipalConfig.identidad.nombreCompleto}. Datos de contacto del Palacio Municipal, formulario de mensajes y ubicación geográfica.`,
  path: "/contacto",
});

export default function ContactoPage() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const { datos } = municipalConfig;

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contacto" }]} />
      <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-guinda)]/20 bg-[var(--color-guinda)]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Estamos para servirte
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Contacto
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--color-text-secondary)] md:text-lg">
            Escríbenos para consultas, sugerencias o para realizar trámites con
            el {municipalConfig.identidad.nombreCompleto}. Atenderemos tu
            solicitud en el menor tiempo posible.
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Envíanos un mensaje
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">
              Los campos marcados con asterisco (*) son obligatorios.
            </p>
            <div className="mt-6">
              <ContactoForm accessKey={accessKey} />
            </div>
          </div>

          <ContactoInfo />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-20">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Cómo llegar
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Ubicación del Palacio Municipal
          </h2>
        </header>
        <MapaEmbed
          lat={datos.coordenadas.lat}
          lon={datos.coordenadas.lon}
          label={municipalConfig.contacto.direccionCompleta || `Palacio Municipal · ${municipalConfig.contacto.ciudad}`}
          zoom={15}
        />
      </section>
    </main>
  );
}
