"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Mountain, Users } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hitos } from "@/lib/hitos";
import { municipalConfig } from "@/lib/municipalConfig";

// Fallback estático del repo. Se usa cuando el CMS no responde o cuando
// el municipio no ha subido una portada propia desde el admin.
const DEFAULT_HERO_IMAGE = "/images/huachinera/cultura-huachinera.jpg";
const TEXT_SHADOW = "0 2px 8px rgba(0,0,0,0.7)";

// Datos derivados de municipalConfig. Al llenar la config, esta sección se
// actualiza sola. Fallback "—" mientras el dato esté pendiente.
const poblacion = municipalConfig.datos.poblacion2020;
const altitud = municipalConfig.datos.altitudMedia;
const features = [
  {
    icon: Calendar,
    label: "Fundación",
    value: municipalConfig.identidad.fundacion.anio ?? "—",
    detail: "Pueblo de misión",
  },
  {
    icon: Calendar,
    label: "Municipio libre",
    value: municipalConfig.identidad.municipioLibre ?? "—",
    detail: "4 de abril de 1952",
  },
  {
    icon: Users,
    label: "Población",
    value: poblacion ? `${poblacion.toLocaleString("es-MX")} hab` : "—",
    detail: "Censo INEGI 2020",
  },
  {
    icon: Mountain,
    label: "Altitud",
    value: altitud ? `${altitud} msnm` : "—",
    detail: "Altitud media municipal",
  },
];

const cardsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

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
          Pueblo de misión de raíz ópata, fundado en 1645 en la Sierra Madre
          Occidental.
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

export function ConoceMunicipio({ portadaUrl } = {}) {
  const reduce = useReducedMotion();
  const heroImage = portadaUrl || DEFAULT_HERO_IMAGE;

  return (
    <>
      {/* HISTORIA — sticky scroll storytelling NYT-style con 2 columnas */}
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
          {/* Fade-in superior: guinda profundo que se desvanece en los
              primeros ~150px para suavizar la unión con el bottom del Hero
              (que termina en el mismo rgba(6,78,59,0.92) por su Capa 2).
              Sin esto, el ojo percibe un salto duro entre Hero y la imagen
              panorámica. Va ANTES del overlay negro existente para que el
              negro se aplique encima del fade-in. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-[rgba(6,78,59,0.92)] to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[rgba(5,150,105,0.20)]"
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
                    El territorio de Huachinera, en la Sierra Madre Occidental, fue
                    habitado por los ópatas. En 1645 el misionero Cristóbal García
                    fundó el pueblo de misión bajo el nombre de «Juan Evangelista de
                    Huachinera»; el topónimo se interpreta como «Mesa de la Huata
                    Sagrada», por el árbol del que se extraía un aceite ritual.
                  </p>
                  <p>
                    El 3 de mayo de 1887 un fuerte terremoto sacudió la región y
                    derribó casi todas las construcciones; con los años se levantó el
                    Templo de San Ignacio de Loyola, hoy patrono del pueblo. El 4 de
                    abril de 1952 Huachinera se erigió como municipio libre e
                    independiente, al separarse de Bacerac.
                  </p>
                  <p>
                    Su vida económica gira en torno a la ganadería bovina y la
                    agricultura de temporal. En 2002 se constituyó el Centro Artístico
                    y Cultural de Huachinera (CACH), sede del Festival Luna de la
                    Montaña, una de las expresiones culturales más representativas de
                    la sierra sonorense.
                  </p>
                </div>
              </motion.article>

              {/* Columna DER: timeline 9 hitos */}
              <TimelineColumn reduce={reduce} />
            </div>
          </div>

          {/* Transición Historia → Datos: últimos 120px funden a guinda (T30) */}
          <div
            aria-hidden="true"
            className="pointer-events-none h-12 w-full bg-gradient-to-b from-transparent to-[var(--color-guinda)]"
          />
        </div>
      </section>

      {/* DATOS DEL MUNICIPIO — sección guinda preservada de T22 */}
      <section
        aria-label="Datos del municipio"
        className="bg-[var(--color-guinda)]"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <header className="mb-8 max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-dorado)]">
              <span
                aria-hidden="true"
                className="block h-px w-8 bg-[var(--color-dorado)]"
              />
              Datos del municipio
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              {municipalConfig.identidad.nombreCorto} en datos
            </h2>
          </header>

          <motion.dl
            variants={reduce ? undefined : cardsContainer}
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {features.map(({ icon: Icon, label, value, detail }) => (
              <motion.div
                key={label}
                variants={reduce ? undefined : cardItem}
                className="rounded-xl border border-[var(--color-dorado)]/30 bg-[var(--color-guinda-deep)] p-5 text-left shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-dorado)]/70 hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)]"
              >
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-[var(--color-dorado)]"
                />
                <dt className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-cream)]/70">
                  {label}
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-[var(--color-dorado)] md:text-xl">
                  {value}
                </dd>
                <dd className="text-[11px] text-[var(--color-cream)]/80">
                  {detail}
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/turismo"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-cta-bg)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-text)] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[var(--color-cta-bg-hover)] hover:shadow-lg"
            >
              Descubre el turismo
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/gobierno/directorio"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-dorado)] hover:text-[var(--color-dorado)]"
            >
              Conoce el Gobierno
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ConoceMunicipio;
