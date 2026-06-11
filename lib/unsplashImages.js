import { getStockImage } from "@/lib/stockImage";

// Imágenes tematizadas para el portal.
//
// - `heroImages`: slides del hero (fallback estático). Apuntan al placeholder
//   local mientras el municipio entrega sus fotos. Sustituye cada `src` por la
//   URL real (Cloudinary o /public/images/...) manteniendo el `id` y la forma
//   { id, src, alt, credit }. Los `id` deben seguir alineados con
//   components/home/heroSlides.js.
// - `noticiaPlaceholderImages` / `getNoticiaImageByCategoria`: imágenes de
//   respaldo por categoría de noticia (se generan por tag con getStockImage).

const SM = { w: 900, h: 600 };

// Fotos reales de Huachinera (procesadas con sharp, <500KB).
// Ver public/images/huachinera/CREDITS.md.
const HUA = "/images/huachinera";

function img(tags, size, alt) {
  return {
    src: getStockImage(tags, size.w, size.h),
    alt,
    credit: "Lorem Flickr · Tags: " + tags,
  };
}

export const heroImages = [
  {
    id: "bienvenida",
    src: `${HUA}/hero-huachinera.jpg`,
    alt: "Vista panorámica de Huachinera en la Sierra Alta de Sonora",
    credit: "",
  },
  {
    id: "patrimonio",
    src: `${HUA}/cultura-huachinera.jpg`,
    alt: "Templo de San Ignacio de Loyola, patrono de Huachinera",
    credit: "",
  },
  {
    id: "sierra",
    src: `${HUA}/galeria-huachinera.jpg`,
    alt: "Paisaje serrano de Huachinera, Sonora",
    credit: "",
  },
  {
    id: "tradicion",
    src: `${HUA}/turismo-huachinera.jpg`,
    alt: "Entorno natural y turismo en Huachinera",
    credit: "",
  },
  {
    id: "rio",
    src: `${HUA}/hero-huachinera.jpg`,
    alt: "Naturaleza de Huachinera, en la Sierra Madre Occidental",
    credit: "",
  },
  {
    id: "gobierno",
    src: `${HUA}/cultura-huachinera.jpg`,
    alt: "Huachinera, Sonora",
    credit: "",
  },
];

// Imágenes por atractivo turístico. Vacío por defecto: al poblar lib/atractivos.js
// se puede mapear cada slug a su set de imágenes con la misma forma { src, alt }.
export const atractivosImages = {};

export const noticiaPlaceholderImages = {
  "obras-publicas": img(
    "mexico,road,construction,rural,machinery",
    SM,
    "Maquinaria trabajando en obras publicas de un camino rural",
  ),
  cultura: img(
    "mexico,culture,traditional,celebration,folklore",
    SM,
    "Celebracion cultural con vestimenta tradicional mexicana",
  ),
  salud: img(
    "mexico,health,clinic,community,vaccination",
    SM,
    "Personal de salud durante jornada de vacunacion comunitaria",
  ),
  educacion: img(
    "mexico,school,classroom,students,education",
    SM,
    "Estudiantes en aula durante actividad escolar",
  ),
  seguridad: img(
    "mexico,rural,road,sierra,landscape",
    SM,
    "Camino rural en zona montanosa",
  ),
  turismo: img(
    "mexico,sierra,landscape,nature",
    SM,
    "Paisaje natural del norte de Mexico",
  ),
  gobierno: img(
    "mexico,government,municipal,building,colonial",
    SM,
    "Edificio institucional historico mexicano",
  ),
  default: img(
    "mexico,municipal,village,colonial",
    SM,
    "Imagen institucional del municipio",
  ),
};

export function getNoticiaImageByCategoria(categoria = "") {
  const key = categoria
    .toLowerCase()
    .replace(/í/g, "i")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u");
  if (key.includes("obra")) return noticiaPlaceholderImages["obras-publicas"];
  if (key.includes("cultura")) return noticiaPlaceholderImages.cultura;
  if (key.includes("salud")) return noticiaPlaceholderImages.salud;
  if (key.includes("educa")) return noticiaPlaceholderImages.educacion;
  if (key.includes("segur")) return noticiaPlaceholderImages.seguridad;
  if (key.includes("turismo")) return noticiaPlaceholderImages.turismo;
  if (
    key.includes("tesor") ||
    key.includes("convocatoria") ||
    key.includes("aviso") ||
    key.includes("secretar")
  )
    return noticiaPlaceholderImages.gobierno;
  return noticiaPlaceholderImages.default;
}

export default {
  heroImages,
  atractivosImages,
  noticiaPlaceholderImages,
  getNoticiaImageByCategoria,
};
