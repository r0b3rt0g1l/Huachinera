"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hitos } from "@/lib/hitos";
import { municipalConfig } from "@/lib/municipalConfig";
import { Footer } from "@/components/layout/Footer";

// Fallback estático del repo. Se usa cuando el CMS no responde o cuando
// el municipio no ha subido una portada propia desde el admin.
const DEFAULT_HERO_IMAGE = "/images/placeholder.jpg";
const TEXT_SHADOW = "0 2px 8px rgba(0,0,0,0.7)";

function HeroBlock({ reduce }) {
  return (
    <div
      className="relative flex min-h-[38vh] items-end px-6 pb-8 pt-16 sm:px-10 lg:min-h-[44vh] lg:px-16 lg:pb-10 lg:pt-16"
      role="region"
      aria-labelledby="historia-titulo"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 60 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-30%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl"
        style={{ textShadow: TEXT_SHADOW }}
      >
        <p className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.32em] text-[var(--color-dorado)]">
          <span
            aria-hidden="true"
            className="block h-px w-8 bg-[var(--color-dorado)]"
          />
          Historia
        </p>
        <h2
          id="historia-titulo"
          className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance text-white lg:text-7xl"
        >
          {municipalConfig.identidad.nombreOficial}
        </h2>
        <p className="mt-5 max-w-xl text-base text-white/85 lg:text-lg">
          Mesa de la Huata Sagrada: pueblo ópata y misión del siglo XVII en la
          sierra alta de Sonora.
        </p>
      </motion.div>
    </div>
  );
}

function HitoItem({ hito, reduce, isLast }) {
  return (
    <motion.li
      role="region"
      aria-label={`Hito ${hito.ano}: ${hito.titulo}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pl-7 ${isLast ? "" : "pb-1.5"}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-3.5 z-10 h-2.5 w-2.5 rounded-full bg-[var(--color-dorado)] ring-[3px] ring-black/40"
      />
      <div className="rounded-lg border border-white/5 bg-black/40 px-3 py-2 backdrop-blur-sm">
        <p className="font-display text-lg font-bold leading-none text-[var(--color-dorado)] lg:text-xl">
          {hito.ano}
        </p>
        <h3 className="mt-0.5 font-display text-sm font-semibold leading-snug text-white lg:text-[15px]">
          {hito.titulo}
        </h3>
        <p className="mt-0.5 font-serif text-[13px] leading-snug text-white/85 lg:text-sm">
          {hito.descripcion}
        </p>
      </div>
    </motion.li>
  );
}

function TimelineColumn({ reduce }) {
  return (
    <div className="relative">
      <ol className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[5px] top-1.5 bottom-1.5 w-px bg-[var(--color-dorado)]/40"
        />
        {hitos.map((hito, index) => (
          <HitoItem
            key={hito.ano}
            hito={hito}
            reduce={reduce}
            isLast={index === hitos.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}

export function Historia({ portadaUrl } = {}) {
  const reduce = useReducedMotion();
  const heroImage = portadaUrl || DEFAULT_HERO_IMAGE;

  return (
    <section
      id="historia"
      aria-label={`Historia de ${municipalConfig.identidad.nombreCorto}`}
      className="relative bg-black"
    >
      {/* Imagen sticky base — Sierra Madre */}
      <div
        className={
          reduce
            ? "relative h-dvh w-full overflow-hidden"
            : "sticky top-0 h-dvh w-full overflow-hidden"
        }
      >
        <Image
          src={heroImage}
          alt="Panorámica de la Sierra Madre Occidental con nubes flotando entre las montañas"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        {/* Sin overlay verde ni oscurecido en el BORDE SUPERIOR: la imagen de
            Historia llega limpia hasta arriba y se pega directo con la imagen
            del hero (gris con gris, sin franja). El oscurecido para legibilidad
            del título/narrativa arranca transparente arriba y baja hacia el
            fondo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"
        />
      </div>

      {/* Contenido superpuesto al sticky */}
      <div
        className={reduce ? "relative z-10" : "relative z-10 -mt-[100dvh]"}
      >
        <HeroBlock reduce={reduce} />

        {/* Grid 2 columnas: narrativa izq + timeline der */}
        <div className="mx-auto max-w-7xl px-6 pb-8 sm:px-10 lg:px-16 lg:pb-12">
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
            {/* Columna IZQ: narrativa fluida (3 párrafos unificados) */}
            <motion.article
              id="historia-narrativa"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-xl border border-white/5 bg-black/40 p-4 backdrop-blur-md lg:p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-dorado)]">
                Historia
              </p>
              <div className="mt-3 space-y-3 font-serif text-[15px] leading-snug text-white lg:text-base">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-[var(--color-dorado)]">
                  Huachinera se localiza en la sierra alta de Sonora, en un
                  territorio habitado desde tiempos prehispánicos por el pueblo
                  ópata. Su nombre proviene del vocablo ópata “huachinera”, que
                  significa “Mesa de la Huata Sagrada”, en referencia al árbol de
                  huata que abunda en la región.
                </p>
                <p>
                  En 1645, el misionero Cristóbal García fundó aquí la misión de
                  San Juan Evangelista de Huachinera, con el propósito de
                  evangelizar a las comunidades ópatas de la sierra. En sus
                  orígenes, el poblado formó parte de la jurisdicción de Bacerac.
                </p>
                <p>
                  Durante el siglo XX, Huachinera fue primero comisaría hasta
                  que, el 4 de abril de 1952, se constituyó como municipio libre
                  e independiente. Hoy es parte del Circuito de la Sierra Alta,
                  reconocido por sus bosques de pino y encino, su patrono San
                  Ignacio de Loyola y atractivos naturales como El Salto y el
                  Pico Guacamayas.
                </p>
              </div>
            </motion.article>

            {/* Columna DER: timeline de hitos */}
            <TimelineColumn reduce={reduce} />
          </div>
        </div>

        {/* Footer fusionado: cierra el contenido superpuesto SOBRE la imagen
            sticky de Historia (sin franja). El home (app/page.js) NO usa el route
            group (con-footer), así que este es su ÚNICO footer (modo overlay,
            transparente sobre la imagen). */}
        <Footer overlay />
      </div>
    </section>
  );
}

export default Historia;
