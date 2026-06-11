import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { formatFechaLarga, tiempoLectura } from "@/lib/dates";
import { cn } from "@/lib/cn";

export function CardPreview({ item, basePath = "/acciones-de-gobierno/noticias" }) {
  return (
    <Link
      href={`${basePath}/${item.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]",
        "transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] focus-visible:-translate-y-1 focus-visible:shadow-[var(--shadow-card-hover)]",
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 transition duration-500 group-hover:scale-105 group-hover:opacity-50 [background-image:radial-gradient(circle_at_30%_30%,rgba(212,160,23,0.45)_0,transparent_55%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.18)_0,transparent_50%)]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          <Tag aria-hidden="true" className="h-3 w-3" />
          {item.categoria}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-[var(--color-guinda)]">
          {item.titulo}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {item.extracto}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
            <time dateTime={item.fecha}>{formatFechaLarga(item.fecha)}</time>
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-[var(--color-guinda)] opacity-0 transition group-hover:opacity-100">
            Leer
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CardPreview;
