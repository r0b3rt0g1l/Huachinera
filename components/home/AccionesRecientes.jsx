"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { formatFechaLarga, tiempoLectura } from "@/lib/dates";
import { getNoticiaImageByCategoria } from "@/lib/unsplashImages";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AccionesRecientes({ noticias = [] }) {
  return (
    <section
      aria-label="Acciones recientes del gobierno"
      className="bg-[var(--color-guinda)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-dorado)]">
              <span
                aria-hidden="true"
                className="block h-px w-8 bg-[var(--color-dorado)]"
              />
              Acciones de Gobierno
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Lo más reciente
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--color-cream)]/80">
              Mantente al tanto de las acciones, comunicados y obras de la
              Administración 2024-2027.
            </p>
          </div>
          <Link
            href="/acciones-de-gobierno"
            className="group inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-[var(--color-cta-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cta-text)] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[var(--color-cta-bg-hover)] hover:shadow-lg"
          >
            Ver todas
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {noticias.map((noticia) => {
            const img = getNoticiaImageByCategoria(noticia.categoria);
            return (
              <motion.li
                key={noticia.slug}
                variants={itemVariants}
                className="group flex flex-col"
              >
                <Link
                  href={`/acciones-de-gobierno/noticias/${noticia.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-dorado)]/30 bg-white shadow-[0_10px_30px_-10px_rgba(74,14,28,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-dorado)]/70 hover:shadow-[0_18px_40px_-12px_rgba(74,14,28,0.6)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-guinda-deep)]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      quality={85}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[var(--color-guinda-deep)]/70 via-[var(--color-guinda-deep)]/20 to-transparent"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-dorado)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-guinda-deep)] shadow-sm">
                      <Tag aria-hidden="true" className="h-3 w-3" />
                      {noticia.categoria}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-xl font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-[var(--color-guinda)]">
                      {noticia.titulo}
                    </h3>
                    <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">
                      {noticia.extracto}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-text-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                        <time dateTime={noticia.fecha}>
                          {formatFechaLarga(noticia.fecha)}
                        </time>
                      </span>
                      <span>{tiempoLectura(noticia.contenido)}</span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {/* Transición Acciones → Footer: últimos 100px funden a guinda profundo (T30) */}
      <div
        aria-hidden="true"
        className="pointer-events-none h-24 w-full bg-gradient-to-b from-transparent to-[var(--color-guinda-deep)]"
      />
    </section>
  );
}

export default AccionesRecientes;
