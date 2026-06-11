import { FileText, Calendar, Eye, Building2 } from "lucide-react";
import { formatFechaLarga } from "@/lib/dates";
import { PDFViewer } from "@/components/transparencia/PDFViewer";

function formatBytes(bytes = 0) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function LeyCard({ ley }) {
  const tieneFechas = Boolean(ley.publicada || ley.actualizada);
  const tieneAdministracion = Boolean(ley.administracion);

  return (
    <article className="group flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-guinda)]/30 hover:shadow-[var(--shadow-card-hover)] md:flex-row md:items-start md:gap-7">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)] text-white shadow-sm">
        <FileText className="h-7 w-7" aria-hidden="true" />
      </span>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--color-dorado)]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-dorado-700)]">
            {ley.ambito}
          </span>
          <span className="rounded-full bg-[var(--color-bg)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            PDF · {formatBytes(ley.tamanoBytes)}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-guinda)]">
          {ley.titulo}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {ley.descripcion}
        </p>

        {(tieneFechas || tieneAdministracion) && (
          <dl className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--color-text-muted)]">
            {ley.publicada && (
              <div className="inline-flex items-center gap-1.5">
                <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                <dt className="sr-only">Publicada</dt>
                <dd>
                  Publicada{" "}
                  <time dateTime={ley.publicada}>
                    {formatFechaLarga(ley.publicada)}
                  </time>
                </dd>
              </div>
            )}
            {ley.actualizada && (
              <div className="inline-flex items-center gap-1.5">
                <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                <dt className="sr-only">Última actualización</dt>
                <dd>
                  Actualizada{" "}
                  <time dateTime={ley.actualizada}>
                    {formatFechaLarga(ley.actualizada)}
                  </time>
                </dd>
              </div>
            )}
            {tieneAdministracion && (
              <div className="inline-flex items-center gap-1.5">
                <Building2 aria-hidden="true" className="h-3.5 w-3.5" />
                <dt className="sr-only">Administración</dt>
                <dd>Administración {ley.administracion}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-2 flex flex-wrap gap-3">
          <PDFViewer
            pdfUrl={ley.archivo}
            title={ley.titulo}
            subtitle={`${ley.ambito} · ${formatBytes(ley.tamanoBytes)}`}
            trigger={
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-guinda)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-guinda-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
              >
                <Eye aria-hidden="true" className="h-4 w-4" />
                Ver documento
              </button>
            }
          />
        </div>
      </div>
    </article>
  );
}

export default LeyCard;
