// Cabildo y gabinete de Huachinera — administración 2024-2027.
// Fallback estático: se usa cuando el CMS no responde o el municipio aún no subió
// miembros. NO inventar nombres; lo no confirmado queda como "Por designar". Shape v2:
// `tipo` en minúsculas, alineado con CabildoSection/DirectorioGrid/Organigrama y el CMS.
export const cabildo = [
  {
    id: 'presidente',
    tipo: 'presidente',
    orden: 1,
    // Confirmado por 3 fuentes (Wikipedia, transparenciasonora.org, Anexo Sonora).
    // Tomó posesión el 16 de septiembre de 2024.
    nombre: 'C. Samuel Dávila Ballesteros',
    cargo: 'Presidente Municipal',
    administracion: '2024-2027',
    comisiones: [],
    bio: 'Presidente Municipal de Huachinera para la administración 2024-2027. Tomó posesión el 16 de septiembre de 2024.',
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'sindica',
    tipo: 'sindica',
    orden: 2,
    nombre: 'Por designar',
    cargo: 'Síndico Municipal',
    administracion: '2024-2027',
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
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
];

// Helpers de derivación. Aceptan cualquier lista de miembros (estática del
// fallback o dinámica del CMS) y devuelven la sub-vista correspondiente.
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

// Gabinete / administración (secretaría, tesorería, contraloría). No es cabildo
// electo; se muestra en el directorio pero no en la vista de Cabildo de /gobierno.
export function deriveGabinete(lista) {
  if (!Array.isArray(lista)) return [];
  return lista
    .filter((m) => m && ['secretario', 'tesorero', 'contralor'].includes(m.tipo))
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

// Ordena la lista por jerarquía según la posición del `tipo` en `ordenTipos`
// (los tipos no listados van al final); desempate por `orden` del CMS.
export function ordenarPorJerarquia(lista, ordenTipos = []) {
  if (!Array.isArray(lista)) return [];
  const rango = (t) => {
    const i = ordenTipos.indexOf(t);
    return i === -1 ? ordenTipos.length : i;
  };
  return [...lista].sort((a, b) => {
    const ra = rango(a?.tipo);
    const rb = rango(b?.tipo);
    if (ra !== rb) return ra - rb;
    return (a?.orden ?? 0) - (b?.orden ?? 0);
  });
}

// ¿El nombre es un placeholder "[PENDIENTE: …]"? (el cargo está confirmado pero la
// persona aún está por designar). Se usa para mostrar "Por designar" en la UI.
export function isPendingName(nombre) {
  return typeof nombre === 'string' && nombre.startsWith('[PENDIENTE');
}

// Exports legacy: calculados sobre el array estático.
export const presidente = derivePresidente(cabildo);
export const sindica = deriveSindica(cabildo);
export const regidores = deriveRegidores(cabildo);
export const dif = deriveDIF(cabildo);

export default cabildo;
