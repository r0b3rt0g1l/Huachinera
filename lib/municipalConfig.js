// Configuración maestra del municipio. ESTE es el archivo que se llena al clonar
// la plantilla para un municipio nuevo. Reemplaza cada token <<...>> y cada valor
// null/'' por el dato oficial. Mientras estén vacíos, la UI muestra placeholders
// defensivos (no links rotos). Ver PLANTILLA_README.md.
export const municipalConfig = {
  identidad: {
    nombreCorto: '<<MUNICIPIO>>',
    nombreOficial: 'Municipio de <<MUNICIPIO>>',
    nombreCompleto: 'H. Ayuntamiento de <<MUNICIPIO>>, <<ESTADO>>',
    estado: '<<ESTADO>>',
    pais: 'México',
    administracion: '<<PERIODO>>',
    // Lema oficial del municipio (opcional).
    lema: '',
    fundacion: {
      anio: null,
      texto: '',
    },
    municipioLibre: null,
    identidadEconomica: '',
    sitiosHistoricos: [],
    ubicacionGeografica: '',
  },

  datos: {
    superficieKm2: null,
    poblacion2020: null,
    altitudMin: null,
    altitudMax: null,
    altitudMedia: null,
    densidad: null,
    idh: null,
    coordenadas: {
      latStr: '',
      lonStr: '',
      lat: null,
      lon: null,
    },
    lada: null,
    cp: '',
  },

  clima: {
    tipo: '',
    temperaturaMediaAnualC: null,
    precipitacionMediaAnualMm: null,
  },

  actividadesEconomicas: {
    principales: [],
    minerales: [],
  },

  // Lista de localidades del municipio (cabecera + localidades).
  localidades: [],

  contacto: {
    direccion: '',
    cp: '',
    ciudad: '<<MUNICIPIO>>, <<ESTADO>>',
    direccionCompleta: '',
    telefonos: [],
    email: '',
    horarios: '',
  },

  // URLs oficiales de redes sociales. Mientras estén en null, MainNav/Footer/
  // ContactoInfo muestran un placeholder defensivo en lugar de un link roto.
  redes: {
    facebook: null,
    instagram: null,
    twitter: null,
    youtube: null,
  },

  enlacesExternos: {
    transparenciaAyuntamiento: null,
    transparenciaAyuntamientoSevac: null,
    transparenciaAyuntamientoLeyes: null,
    transparenciaSonora: null,
    plataformaNacionalTransparencia: 'https://www.plataformadetransparencia.org.mx',
    avisoPrivacidadPdf: null,
  },

  // Paleta base de la plantilla (sistema CTA crema / guinda institucional).
  // Sincronizada con app/globals.css. Sobreescribir por municipio si se desea
  // una identidad cromática propia.
  paleta: {
    guinda: '#6B1629',
    guindaProfundo: '#4A0E1C',
    guindaSuave: '#8A2A3D',
    dorado: '#BF9B30',
    doradoSuave: '#D4B445',
    crema: '#F5F5DC',
    texto: '#1A1A1A',
    textoSecundario: '#4A4A4A',
    fondo: '#FAFAFA',
    borde: '#E5E5E5',
  },

  servicios: {
    // Key de Web3Forms para formularios (env var WEB3FORMS_ACCESS_KEY en Vercel).
    web3FormsKey: process.env.WEB3FORMS_ACCESS_KEY,
    // Cuenta de Cloudinary del municipio (opcional).
    cloudinaryCloud: '',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://municipio.example.com',
  },

  developer: {
    nombre: 'Northa Digital',
    anioActual: 2026,
  },
};

export default municipalConfig;
