// Hitos históricos del municipio (línea del tiempo).
//
// Fuente única para los componentes que los renderizan: el TimelineColumn
// interno de components/home/ConoceMunicipio.jsx (HitoItem usa solo `ano`,
// `titulo` y `descripcion`). El componente legacy LineaTiempo.jsx también
// consume `datoCurioso`, `imagen` y `escudo` si llega a usarse.
//
// Al clonar la plantilla: reemplaza el array por los hitos reales del municipio.
// Regla recomendada: cada afirmación respaldada por una fuente citable (deja la
// URL en un comentario adyacente). Mientras el array esté vacío, la sección de
// historia se muestra "en preparación".
//
// Shape de cada hito:
//   { ano, titulo, descripcion, datoCurioso?, imagen?, escudo?, align: 'left'|'right' }

export const hitos = [];

export function getHitoByYear(year) {
  return hitos.find((h) => h.ano === String(year)) ?? null;
}

export default hitos;
