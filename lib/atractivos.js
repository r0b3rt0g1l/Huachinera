// Atractivos turísticos del municipio. Al clonar la plantilla, reemplaza el array
// por el inventario real del municipio. Mientras esté vacío, la sección de turismo
// se muestra "en preparación".
//
// Cada entrada debe seguir esta forma:
//   {
//     slug, nombre, tipo, ubicacion, descripcionCorta, descripcionLarga,
//     portada, galeria: [{ src, alt }, ...], coordenadas: { lat, lon },
//     horario, destacado: boolean,
//   }
// Las imágenes pueden generarse con getStockImage(tags, w, h) del módulo
// '@/lib/stockImage' mientras llegan las oficiales.

// Atractivos confirmados de Huachinera (en sitiosHistoricos del recon). Sin fotos
// inventadas: el Templo usa su foto real; el CACH usa placeholder hasta tener una
// oficial. coordenadas/horario quedan null (no especificados en la fuente).
const PLACEHOLDER = "/images/placeholder.jpg";

export const atractivos = [
  {
    slug: "templo-san-ignacio-de-loyola",
    nombre: "Templo de San Ignacio de Loyola",
    tipo: "Patrimonio",
    ubicacion: "Huachinera, Sonora",
    descripcionCorta:
      "Patrono del pueblo; reedificado tras el terremoto de 1887.",
    descripcionLarga:
      "El Templo de San Ignacio de Loyola es el principal emblema religioso de Huachinera. Tras el terremoto de mayo de 1887, que derribó casi todas las construcciones del pueblo, fue reedificado con los años. Hoy alberga las fiestas patronales del 31 de julio en honor a San Ignacio de Loyola.",
    portada: "/images/huachinera/cultura-huachinera.jpg",
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: true,
  },
  {
    slug: "centro-artistico-cultural-huachinera",
    nombre: "Centro Artístico y Cultural de Huachinera (CACH)",
    tipo: "Cultura",
    ubicacion: "Huachinera, Sonora",
    descripcionCorta:
      "Casa de la cultura serrana, sede del Festival Luna de la Montaña.",
    descripcionLarga:
      "Constituido en 2002, el Centro Artístico y Cultural de Huachinera (CACH) impulsa la escultura, la cerámica, la pintura y la música en la sierra sonorense. Es sede del Festival Luna de la Montaña, que cada otoño celebra la luna llena sobre la montaña.",
    portada: PLACEHOLDER,
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: false,
  },
];

export function getAtractivoPorSlug(slug) {
  return atractivos.find((a) => a.slug === slug) || null;
}

export function getAtractivosCercanos(slugActual, limit = 3) {
  return atractivos
    .filter((a) => a.slug !== slugActual)
    .slice(0, limit);
}

// Platillos y dulces típicos del municipio (gastronomía).
export const gastronomia = {
  platillos: [],
  dulces: [],
};

// Artesanías típicas del municipio.
export const artesanias = [];

export default atractivos;
