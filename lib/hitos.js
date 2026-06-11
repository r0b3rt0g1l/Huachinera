// Hitos históricos de Huachinera (línea del tiempo).
//
// Consumido por el TimelineColumn de components/home/ConoceMunicipio.jsx
// (usa `ano`, `titulo`, `descripcion`). Cada afirmación va con fuente citada.
// Shape: { ano, titulo, descripcion, datoCurioso?, imagen?, escudo?, align }
//
// Correcciones vs. demo viejo: municipio libre 1952 (no 1932); CACH 2002 (no 2010).

export const hitos = [
  {
    ano: '1645',
    titulo: 'Fundación de Huachinera',
    descripcion:
      'El misionero Cristóbal García funda el pueblo de misión "Juan Evangelista de Huachinera" en territorio ópata de la Sierra Madre Occidental.',
    datoCurioso:
      'El topónimo se interpreta como "Mesa de la Huata Sagrada", por el árbol del que se extraía un aceite o incienso ritual.',
    align: 'left',
    // Fuente: Wikipedia ES, EcuRed, explorasonora.com.
  },
  {
    ano: '1767',
    titulo: 'Fin de la etapa jesuita',
    descripcion:
      'Tras la expulsión de la Compañía de Jesús de los dominios españoles, las misiones de la sierra sonorense —Huachinera entre ellas— pasan a la administración secular.',
    align: 'right',
    // Fuente: hecho histórico general (expulsión jesuita de 1767); contexto en index.html del demo.
  },
  {
    ano: '1887',
    titulo: 'El gran terremoto',
    descripcion:
      'El sismo del 3 de mayo de 1887 sacude la región y derriba casi todas las construcciones. Con los años se reconstruye el Templo de San Ignacio de Loyola, hoy patrono del pueblo.',
    align: 'left',
    // Fuente: la-chicharra.com.
  },
  {
    ano: '1952',
    titulo: 'Municipio independiente',
    descripcion:
      'El 4 de abril de 1952 Huachinera se erige como municipio libre, separándose de Bacerac.',
    align: 'right',
    // Fuente: EcuRed, explorasonora.com.
  },
  {
    ano: '2002',
    titulo: 'Centro Artístico y Cultural',
    descripcion:
      'Se constituye legalmente el Centro Artístico y Cultural de Huachinera (CACH) el 22 de marzo de 2002, sede del Festival Luna de la Montaña.',
    align: 'left',
    // Fuente: sic.cultura.gob.mx.
  },
  {
    ano: '2024',
    titulo: 'Administración 2024-2027',
    descripcion:
      'Samuel Dávila Ballesteros asume la presidencia municipal el 16 de septiembre de 2024.',
    align: 'right',
    // Fuente: huachinera.transparenciasonora.org.
  },
];

export function getHitoByYear(year) {
  return hitos.find((h) => h.ano === String(year)) ?? null;
}

export default hitos;
