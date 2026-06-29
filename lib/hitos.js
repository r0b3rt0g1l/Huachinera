// Hitos históricos del municipio (línea del tiempo). Datos verificados de Huachinera.
// El campo `ano` es texto libre (admite "Época prehispánica" / "Siglo XVII", no solo
// números). Los componentes que los renderizan usan `ano`, `titulo` y `descripcion`.
//
// Shape de cada hito:
//   { ano, titulo, descripcion, datoCurioso?, imagen?, escudo?, align: 'left'|'right' }

export const hitos = [
  {
    ano: "Época prehispánica",
    titulo: "Asentamiento ópata",
    descripcion: "La sierra alta es habitada por el pueblo ópata.",
  },
  {
    ano: "1645",
    titulo: "Fundación de la misión",
    descripcion:
      "El misionero Cristóbal García funda la misión de San Juan Evangelista de Huachinera.",
  },
  {
    ano: "Siglo XVII",
    titulo: "Jurisdicción de Bacerac",
    descripcion: "Se establece el poblado bajo la jurisdicción de Bacerac.",
  },
  {
    ano: "1929",
    titulo: "Constitución como comisaría",
    descripcion: "Huachinera se constituye como comisaría.",
  },
  {
    ano: "1952",
    titulo: "Municipio libre e independiente",
    descripcion:
      "Se establece como municipio libre e independiente (4 de abril).",
  },
  {
    ano: "Actualidad",
    titulo: "Circuito de la Sierra Alta",
    descripcion: "Forma parte del Circuito de la Sierra Alta de Sonora.",
  },
];

export function getHitoByYear(year) {
  return hitos.find((h) => h.ano === String(year)) ?? null;
}

export default hitos;
