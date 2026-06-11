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

export const atractivos = [];

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
