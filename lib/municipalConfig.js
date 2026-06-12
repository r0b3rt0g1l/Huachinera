// Configuración maestra del municipio de HUACHINERA, Sonora.
// Datos con fuente citada en comentarios (recon 2026-06-11). Lo no confirmado
// queda null/''; la UI muestra placeholders defensivos (no links rotos).
// PRIVACIDAD: teléfono y correo NO se publican (cero mailto:/tel:); viven solo
// en el registro interno / CMS. Ver RECON_huachinera.md.
export const municipalConfig = {
  identidad: {
    nombreCorto: 'Huachinera',
    nombreOficial: 'Municipio de Huachinera',
    nombreCompleto: 'H. Ayuntamiento de Huachinera, Sonora',
    estado: 'Sonora',
    pais: 'México',
    administracion: '2024-2027',
    // Sin lema oficial confirmado.
    lema: '',
    fundacion: {
      anio: 1645, // Wikipedia/EcuRed/explorasonora: fundada en 1645.
      texto:
        'Fundada en 1645 por el misionero Cristóbal García como "Juan Evangelista de Huachinera", en territorio ópata de la Sierra Madre Occidental.',
    },
    // Erigido municipio independiente (separado de Bacerac) el 4 de abril de 1952
    // (EcuRed/explorasonora). El demo viejo decía 1932: incorrecto.
    municipioLibre: 1952,
    // Valor corto mostrado en la tarjeta "Identidad" de la home.
    identidadEconomica: 'Ganadería y sierra',
    sitiosHistoricos: [
      'Templo de San Ignacio de Loyola',
      'Centro Artístico y Cultural de Huachinera (CACH)',
    ],
    ubicacionGeografica: 'Sierra Alta de Sonora',
  },

  datos: {
    superficieKm2: 1184.86, // Wikipedia ES/EN.
    poblacion2020: 1186, // INEGI Censo 2020 (607 H / 579 M). El demo usaba 1,350 (censo 2010): obsoleto.
    altitudMin: null,
    altitudMax: null,
    altitudMedia: 914, // msnm — altitud media municipal (INEGI/EcuRed).
    densidad: null, // no afirmado por fuente directa.
    idh: null,
    coordenadas: {
      latStr: '30°12′N',
      lonStr: '108°57′O',
      lat: 30.2056, // INEGI/Wikipedia EN.
      lon: -108.9577,
    },
    lada: '634',
    cp: '84400',
  },

  clima: {
    tipo: 'Semiseco templado', // Wikipedia/EcuRed.
    temperaturaMediaAnualC: 19.6, // Wikipedia ES.
    precipitacionMediaAnualMm: null, // fuentes discrepantes (632 vs 427) → null.
  },

  actividadesEconomicas: {
    principales: [
      'Ganadería bovina extensiva',
      'Agricultura de temporal (maíz, frijol)',
      'Silvicultura',
    ],
    minerales: [],
  },

  // Localidades con CP confirmado (buscacp.com). Cabecera + principales.
  localidades: [
    { nombre: 'Huachinera (cabecera)', cp: '84400' },
    { nombre: 'Aribabi', cp: '84427' },
    { nombre: 'La Calera', cp: '84403' },
    { nombre: 'Cerrito El Calvario', cp: '84404' },
    { nombre: 'La Higuera', cp: '84405' },
    { nombre: 'Bacatete', cp: '84406' },
    { nombre: 'Tacuba', cp: '84407' },
    { nombre: 'Juribana', cp: '84415' },
  ],

  contacto: {
    // Dirección pública del palacio municipal (edificio público — sí se publica).
    direccion: 'Plaza Morelos No. 1, Col. Centro',
    cp: '84400',
    ciudad: 'Huachinera, Sonora',
    direccionCompleta:
      'Plaza Morelos No. 1, Col. Centro, Huachinera, Sonora, C.P. 84400',
    // PRIVACIDAD: teléfono y correo NO se publican. Vacíos → la UI no renderiza tel:/mailto:.
    telefonos: [],
    email: '',
    horarios: '',
  },

  // Mientras estén en null, MainNav/Footer/ContactoInfo muestran placeholder
  // defensivo. FB del demo (profile.php?id=100073040122918) pendiente de verificar.
  redes: {
    facebook: null,
    instagram: null,
    twitter: null,
    youtube: null,
  },

  enlacesExternos: {
    // Sitio de transparencia activo del municipio (confirmado en recon).
    transparenciaAyuntamiento: 'https://huachinera.transparenciasonora.org/',
    transparenciaAyuntamientoSevac: null,
    transparenciaAyuntamientoLeyes: null,
    // Portal de Transparencia del Estado de Sonora — ficha de Huachinera (id 1125).
    transparenciaSonora:
      'https://transparencia.sonora.gob.mx/informacion-publica/organismos/9/municipios/1125/huachinera/1',
    plataformaNacionalTransparencia: 'https://www.plataformadetransparencia.org.mx',
    avisoPrivacidadPdf: null,
  },

  // PALETA PROVISIONAL (placeholder — colores oficiales pendientes de la jefa).
  // Tokens legacy guinda/dorado conservan nombre; portan emerald (primario) y
  // cyan (acento). Sincronizada con app/globals.css @theme.
  paleta: {
    guinda: '#059669',
    guindaProfundo: '#064E3B',
    guindaSuave: '#10B981',
    dorado: '#0891B2',
    doradoSuave: '#06B6D4',
    crema: '#ECFDF5',
    texto: '#1A1A1A',
    textoSecundario: '#4A4A4A',
    fondo: '#FAFAFA',
    borde: '#E5E5E5',
  },

  servicios: {
    web3FormsKey: process.env.WEB3FORMS_ACCESS_KEY,
    cloudinaryCloud: '',
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL || 'https://huachinera-gobierno.vercel.app',
  },

  developer: {
    nombre: 'Northa Digital',
    anioActual: 2026,
  },
};

export default municipalConfig;
