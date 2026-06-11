import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";

export function ContactoInfo() {
  const { contacto, datos, redes } = municipalConfig;

  const items = [
    {
      icon: MapPin,
      label: "Dirección",
      value: contacto.direccionCompleta,
    },
    {
      icon: Phone,
      label: "Teléfono",
      phones: contacto.telefonos,
      legendSecondary: datos.lada ? `Lada ${datos.lada}` : null,
    },
    {
      icon: Mail,
      label: "Correo electrónico",
      value: contacto.email,
      href: `mailto:${contacto.email}`,
    },
    {
      icon: Clock,
      label: "Horarios de atención",
      value: contacto.horarios,
    },
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
                {item.phones ? (
                  <div className="mt-1 space-y-0.5">
                    {item.phones.map((tel) => {
                      const isPending =
                        typeof tel === "string" &&
                        tel.startsWith("[PENDIENTE");
                      return isPending ? (
                        <p
                          key={tel}
                          className="block text-sm font-medium italic text-[var(--color-text-muted)]"
                        >
                          {tel}
                        </p>
                      ) : (
                        <a
                          key={tel}
                          href={`tel:${tel.replace(/\s+/g, "")}`}
                          className="block text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-guinda)] hover:underline"
                        >
                          {tel}
                        </a>
                      );
                    })}
                    {item.legendSecondary && (
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {item.legendSecondary}
                      </p>
                    )}
                  </div>
                ) : item.href &&
                  !(
                    typeof item.value === "string" &&
                    item.value.startsWith("[PENDIENTE")
                  ) ? (
                  <a
                    href={item.href}
                    className="mt-1 block text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-guinda)] hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p
                    className={`mt-1 text-sm font-medium ${
                      typeof item.value === "string" &&
                      item.value.startsWith("[PENDIENTE")
                        ? "italic text-[var(--color-text-muted)]"
                        : "text-[var(--color-text)]"
                    }`}
                  >
                    {item.value}
                  </p>
                )}
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
            TODO_MUNICIPIO: redes_sociales — URL oficial pendiente.
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactoInfo;
