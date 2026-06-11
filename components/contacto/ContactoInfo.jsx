import Link from "next/link";
import { MapPin, Clock, Facebook } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";

export function ContactoInfo() {
  const { contacto, redes } = municipalConfig;

  // PRIVACIDAD (política Northa): NO se publican teléfono ni correo. El canal de
  // contacto es el formulario de esta misma página. Solo se muestran datos
  // públicos del edificio (dirección y, si existen, horarios).
  const items = [
    {
      icon: MapPin,
      label: "Dirección",
      value: contacto.direccionCompleta,
    },
    ...(contacto.horarios
      ? [
          {
            icon: Clock,
            label: "Horarios de atención",
            value: contacto.horarios,
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
          Datos de contacto
        </p>
        <h2 className="mt-2 font-display text-xl font-bold leading-snug text-[var(--color-text)] md:text-2xl">
          Palacio Municipal de {municipalConfig.identidad.nombreCorto}
        </h2>
        <ul className="mt-6 space-y-5">
          {items.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-guinda)]/10 text-[var(--color-guinda)]">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1 leading-tight">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text)]">
                  {item.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-guinda-deep)] p-6 text-white shadow-[var(--shadow-card)] md:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]/70">
          Síguenos en redes
        </p>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[var(--color-cream)]">
          Mantente al día con el Gobierno Municipal
        </h3>
        {redes.facebook ? (
          <Link
            href={redes.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Facebook oficial del ${municipalConfig.identidad.nombreCompleto}`}
            className="group mt-5 inline-flex items-center gap-3 rounded-xl bg-white/5 p-3 transition hover:bg-white/10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-guinda)] text-white transition group-hover:bg-[var(--color-dorado)] group-hover:text-[var(--color-guinda-deep)]">
              <Facebook className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs uppercase tracking-[0.18em] text-[var(--color-cream)]/60">
                Facebook oficial
              </span>
              <span className="block text-sm font-semibold text-white">
                Página oficial
              </span>
            </span>
          </Link>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed border-white/20 bg-white/5 p-3 text-xs italic text-[var(--color-cream)]/60">
            Pronto compartiremos nuestros canales oficiales.
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactoInfo;
