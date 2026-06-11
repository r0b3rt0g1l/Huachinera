"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ScrollIndicator } from "@/components/home/ScrollIndicator";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { municipalConfig } from "@/lib/municipalConfig";

const ALIGN_CLASSES = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export function HeroCarousel({ slides }) {
  if (!slides || slides.length === 0) return null;

  const heroRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 36 },
    [
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const activeSlide = slides[selectedIndex];

  return (
    <section
      ref={heroRef}
      aria-roledescription="carrusel"
      aria-label={`Vistas destacadas de ${municipalConfig.identidad.nombreCorto}`}
      className="relative isolate h-[100svh] w-full overflow-hidden bg-[var(--color-guinda-deep)] text-white"
    >
      {/* Background layer: Embla images, parallax translateY 0 → -200 */}
      <motion.div
        style={
          reduce ? undefined : { y: bgY, willChange: "transform" }
        }
        className="absolute inset-0"
      >
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${slides.length}: ${slide.title}`}
                className="relative h-full w-full shrink-0 grow-0 basis-full"
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  quality={85}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Degradado guinda: fuerte abajo donde vive el texto (~35% inferior),
          transparente en el ~65% superior para apreciar la imagen del slide.
          Texto blanco mantiene contraste WCAG AA en h1, subtítulo y eyebrow
          incluso sobre imágenes con cielo muy claro. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[rgba(6,78,59,0.92)] via-[rgba(6,78,59,0.55)] via-40% to-transparent to-65%"
      />

      {/* Sin fade-a-negro al final: la transición a la sección Historia se
          resuelve por continuidad de color. El bottom de este Hero queda en
          guinda profundo (Capa 2 termina en rgba(6,78,59,0.92)) y el top
          de Historia arranca con el mismo guinda profundo desvaneciéndose,
          eliminando el salto duro a negro. Ver ConoceMunicipio.jsx. */}

      {/* Content layer: title + subtitle + CTA, translateY 0→-40 + opacity 1→0.4 */}
      <motion.div
        style={
          reduce
            ? undefined
            : {
                y: contentY,
                opacity: contentOpacity,
                willChange: "transform, opacity",
              }
        }
        className="relative z-10 flex h-full"
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl flex-col justify-end gap-6 px-6 pb-32 md:pb-36",
            ALIGN_CLASSES[activeSlide?.align ?? "center"],
          )}
        >
          <AnimatePresence mode="wait">
            {activeSlide && (
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "flex max-w-3xl flex-col gap-5",
                  ALIGN_CLASSES[activeSlide.align ?? "center"],
                )}
              >
                <span className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-dorado)]">
                  <span
                    aria-hidden="true"
                    className="block h-px w-8 bg-[var(--color-dorado)]"
                  />
                  {activeSlide.eyebrow}
                </span>
                <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance text-white md:text-5xl lg:text-6xl">
                  {activeSlide.title}
                </h1>
                <p className="max-w-2xl text-balance text-base leading-relaxed text-[var(--color-cream)]/90 md:text-lg">
                  {activeSlide.subtitle}
                </p>
                <div>
                  <Link
                    href={activeSlide.cta.href}
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-cta-bg)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-text)] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[var(--color-cta-bg-hover)] hover:shadow-xl"
                  >
                    {activeSlide.cta.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Arrows */}
      <button
        type="button"
        aria-label="Diapositiva anterior"
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[rgba(5,150,105,0.4)] p-3 text-white backdrop-blur-sm transition hover:border-[var(--color-dorado)] hover:bg-[rgba(5,150,105,0.7)] hover:text-[var(--color-dorado)] md:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Diapositiva siguiente"
        onClick={scrollNext}
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[rgba(5,150,105,0.4)] p-3 text-white backdrop-blur-sm transition hover:border-[var(--color-dorado)] hover:bg-[rgba(5,150,105,0.7)] hover:text-[var(--color-dorado)] md:inline-flex"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Dots */}
      <div
        role="tablist"
        aria-label="Selector de diapositivas"
        className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
      >
        {snaps.map((_, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Ir a diapositiva ${index + 1}`}
              onClick={() => scrollTo(index)}
              className="group flex h-8 items-center justify-center px-1"
            >
              <motion.span
                aria-hidden="true"
                animate={{
                  width: isActive ? 32 : 8,
                  backgroundColor: isActive
                    ? "rgb(212, 160, 23)"
                    : "rgba(255, 255, 255, 0.4)",
                }}
                transition={{
                  duration: reduce ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-1.5 rounded-full"
              />
            </button>
          );
        })}
      </div>

      {/* Scroll Indicator: bounces and fades on scroll */}
      <ScrollIndicator
        scrollYProgress={scrollYProgress}
        heroRef={heroRef}
      />
    </section>
  );
}

export default HeroCarousel;
