import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import { formatFechaLarga, tiempoLectura } from "@/lib/dates";

export function NoticiaHero({ item, kind = "noticia", backHref = "/acciones-de-gobierno" }) {
  const tieneFoto = item.imagen && /^https?:\/\//.test(item.imagen);
  return (
    <header className="relative isolate overflow-hidden bg-[var(--color-guinda-deep)] text-white">
      {tieneFoto && (
        <>
          <Image
            src={item.imagen}
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-10 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--color-guinda-deep)] via-[var(--color-guinda-deep)]/85 to-[var(--color-guinda-deep)]/65"
          />
        </>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_25%_30%,rgba(212,160,23,0.55)_0,transparent_50%),radial-gradient(circle_at_75%_70%,white_0,transparent_50%)]"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-20">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--color-cream)] backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Volver a {kind === "comunicado" ? "comunicados" : "acciones de gobierno"}
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-dorado)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-guinda-deep)]">
            <Tag aria-hidden="true" className="h-3 w-3" />
            {item.categoria}
          </span>
          {item.autor && (
            <span className="text-[11px] uppercase tracking-widest text-[var(--color-cream)]/70">
              · {item.autor}
            </span>
          )}
        </div>

        <h1 className="mt-5 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
          {item.titulo}
        </h1>

        {item.extracto && (
          <p className="mt-5 max-w-3xl text-balance text-base text-[var(--color-cream)]/90 md:text-lg">
            {item.extracto}
          </p>
        )}

        <dl className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--color-cream)]/85">
          <div className="inline-flex items-center gap-2">
            <Calendar aria-hidden="true" className="h-4 w-4" />
            <dt className="sr-only">Fecha de publicación</dt>
            <dd>
              <time dateTime={item.fecha}>{formatFechaLarga(item.fecha)}</time>
            </dd>
          </div>
          <div className="inline-flex items-center gap-2">
            <Clock aria-hidden="true" className="h-4 w-4" />
            <dt className="sr-only">Tiempo estimado de lectura</dt>
            <dd>{tiempoLectura(item.contenido)}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}

export default NoticiaHero;
