import { Pencil, Send, FileSearch, MailCheck } from "lucide-react";

const pasos = [
  {
    icon: Pencil,
    titulo: "1. Describe tu solicitud",
    descripcion:
      "Detalla con claridad la información pública que requieres y selecciona la modalidad preferida de entrega.",
  },
  {
    icon: Send,
    titulo: "2. Envía el formulario",
    descripcion:
      "La solicitud llega directamente a la Unidad de Transparencia Municipal a través del sistema seguro de Web3Forms.",
  },
  {
    icon: FileSearch,
    titulo: "3. Análisis y búsqueda",
    descripcion:
      "La Unidad de Transparencia tramita tu solicitud con las áreas correspondientes dentro de los plazos legales.",
  },
  {
    icon: MailCheck,
    titulo: "4. Recibe tu respuesta",
    descripcion:
      "Recibirás la información en la modalidad seleccionada conforme a la Ley General de Transparencia y Acceso a la Información Pública.",
  },
];

export function ComoFunciona() {
  return (
    <section
      aria-label="Cómo funciona la solicitud de información pública"
      className="bg-[var(--color-bg)] border-y border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            ¿Cómo funciona?
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            En 4 pasos puedes ejercer tu derecho de acceso a la información
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            El derecho a la información pública es un derecho humano garantizado
            por la Constitución y las leyes federales y estatales.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso, i) => (
            <li
              key={paso.titulo}
              className="relative flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-guinda)] text-white">
                <paso.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-bold leading-snug text-[var(--color-text)]">
                {paso.titulo}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {paso.descripcion}
              </p>
              {i < pasos.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2.5 top-1/2 hidden h-px w-5 -translate-y-1/2 bg-gradient-to-r from-[var(--color-guinda)]/30 to-transparent lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ComoFunciona;
