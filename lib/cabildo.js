// Cabildo (fallback estático). Al clonar la plantilla, reemplaza estos ejemplos
// "Por designar" por los integrantes reales del Ayuntamiento, o conéctalo al CMS
// (lib/cms.js -> getCabildoFromCMS). El shape debe mantenerse: `tipo` en minúsculas
// (presidente | sindica | regidor | dif) para alinear con CabildoSection y el mapeo
// del CMS. Las tarjetas manejan "Por designar" de forma defensiva.
export const cabildo = [
  {
    id: 'presidente',
    tipo: 'presidente',
    orden: 1,
    nombre: 'Por designar',
    cargo: 'Presidente Municipal',
    administracion: '<<PERIODO>>',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'sindica',
    tipo: 'sindica',
    orden: 2,
    nombre: 'Por designar',
    cargo: 'SÍNDICO MUNICIPAL',
    administracion: '<<PERIODO>>',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'dif',
    tipo: 'dif',
    orden: 3,
    nombre: 'Por designar',
    cargo: 'Presidencia del DIF Municipal',
    administracion: '<<PERIODO>>',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
];

// Helpers de derivación. Aceptan cualquier lista de miembros (estática del
// fallback o dinámica del CMS) y devuelven la sub-vista correspondiente.
// Mantener `tipo` en minúsculas para alinear con el shape ya consumido por
// CabildoSection y por el mapeo del CMS en lib/cms.js (mapFuncionarioCMSToPortal).
export function derivePresidente(lista) {
  if (!Array.isArray(lista)) return null;
  return lista.find((m) => m && m.tipo === 'presidente') || null;
}

export function deriveSindica(lista) {
  if (!Array.isArray(lista)) return null;
  return lista.find((m) => m && m.tipo === 'sindica') || null;
}

export function deriveRegidores(lista) {
  if (!Array.isArray(lista)) return [];
  return lista
    .filter((m) => m && m.tipo === 'regidor')
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

export function deriveDIF(lista) {
  if (!Array.isArray(lista)) return null;
  return lista.find((m) => m && m.tipo === 'dif') || null;
}

// Exports legacy: calculados sobre el array estático. Se mantienen para
// backwards-compat con cualquier consumidor no-migrado. Las páginas server
// component que ya leen del CMS (`directorio`, `estructura-organica`, `/gobierno`)
// usan los helpers de arriba contra la lista del CMS o el fallback.
export const presidente = derivePresidente(cabildo);
export const sindica = deriveSindica(cabildo);
export const regidores = deriveRegidores(cabildo);
export const dif = deriveDIF(cabildo);

export default cabildo;
