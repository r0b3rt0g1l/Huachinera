// Slug del municipio que este sitio representa. Permite reusar este repo
// como plantilla para cualquier municipio cambiando solo la env var, sin tocar
// código. Para cada sitio: setear NEXT_PUBLIC_MUNICIPIO_SLUG=<slug> (en Vercel o
// en .env.local). El default genérico "municipio" solo aplica si la env var falta.
const MUNICIPIO_SLUG =
  process.env.NEXT_PUBLIC_MUNICIPIO_SLUG || "municipio";

export async function getHeroSlides() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn(
      "[cms] NEXT_PUBLIC_API_URL no está definido. Usando fallback de hero.",
    );
    return null;
  }

  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}/hero`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `[cms] Hero endpoint respondió con status ${response.status}.`,
      );
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("[cms] Hero endpoint devolvió JSON inválido:", parseError);
      return null;
    }

    if (!Array.isArray(data)) {
      console.warn("[cms] Hero endpoint no devolvió un array.");
      return null;
    }

    const activeSlides = data.filter((item) => item && item.activo === true);

    if (activeSlides.length === 0) {
      // CMS respondió OK pero sin slides activos: devolver array vacío
      // (no null) para que el consumidor sepa distinguir esto de un
      // error de conexión y NO caiga al fallback hardcoded del template.
      return [];
    }

    activeSlides.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

    return activeSlides.map((item) => ({
      id: item.id,
      eyebrow: item.etiqueta || "",
      title: item.titulo,
      subtitle: item.subtitulo || "",
      cta: {
        label: item.textoBoton || "Ver más",
        href: item.linkBoton || "/",
      },
      image: item.imagenUrl,
      alt: item.titulo,
      align: "center",
    }));
  } catch (error) {
    console.error("[cms] Error al obtener slides del hero:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function toISODate(value) {
  if (!value) return "";
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

function mapNoticiaCMSToPortal(item) {
  const contenido = item.contenido || item.cuerpo || "";
  const extractoRaw =
    item.extracto && typeof item.extracto === "string"
      ? item.extracto
      : contenido;
  const extracto =
    extractoRaw.length > 200
      ? extractoRaw.slice(0, 197).trimEnd() + "..."
      : extractoRaw;

  const fechaSrc =
    item.fechaPublicacion || item.fecha || item.creadoEn || item.createdAt;

  // El endpoint /noticias/:slug (detalle) incluye autor como objeto
  // { id, nombre } por el include de Prisma. El endpoint /noticias (list)
  // no trae autor en absoluto. Normalizamos a string en ambos casos.
  let autorNombre;
  if (item.autor && typeof item.autor === "object") {
    autorNombre = item.autor.nombre || "Gobierno Municipal";
  } else {
    autorNombre = item.autor || "Gobierno Municipal";
  }

  return {
    slug: item.slug ?? item.id,
    titulo: item.titulo || "",
    extracto,
    contenido,
    categoria: item.categoria || "Sin categoría",
    fecha: toISODate(fechaSrc),
    autor: autorNombre,
    imagen: item.imagenUrl || item.imagen || "/og/og-default.jpg",
  };
}

export async function getNoticiasFromCMS() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn(
      "[cms] NEXT_PUBLIC_API_URL no está definido. Usando fallback de noticias.",
    );
    return null;
  }

  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}/noticias`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `[cms] Noticias endpoint respondió con status ${response.status}.`,
      );
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(
        "[cms] Noticias endpoint devolvió JSON inválido:",
        parseError,
      );
      return null;
    }

    if (!Array.isArray(data)) {
      console.warn("[cms] Noticias endpoint no devolvió un array.");
      return null;
    }

    const activeNoticias = data.filter(
      (item) => item && item.activo !== false,
    );

    if (activeNoticias.length === 0) {
      return null;
    }

    activeNoticias.sort((a, b) => {
      const da = new Date(
        a.fechaPublicacion || a.fecha || a.creadoEn || 0,
      ).getTime();
      const db = new Date(
        b.fechaPublicacion || b.fecha || b.creadoEn || 0,
      ).getTime();
      return db - da;
    });

    return activeNoticias.map(mapNoticiaCMSToPortal);
  } catch (error) {
    console.error("[cms] Error al obtener noticias:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Trae UNA noticia por su slug desde el endpoint detalle del backend.
// A diferencia de getNoticiasFromCMS (lista), este endpoint sí devuelve
// el campo `contenido` completo y el `autor` poblado.
// Devuelve null si: NEXT_PUBLIC_API_URL no está definida, el slug es
// inválido, el backend responde !ok (404 incluido) o hay error de red.
export async function getNoticiaPorSlugFromCMS(slug) {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    return null;
  }

  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}/noticias/${encodeURIComponent(
    slug,
  )}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(
        "[cms] Detalle de noticia devolvió JSON inválido:",
        parseError,
      );
      return null;
    }

    if (!data || typeof data !== "object") {
      return null;
    }

    return mapNoticiaCMSToPortal(data);
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error("[cms] Error al obtener detalle de noticia:", error);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getImagenesFromCMS() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn(
      "[cms] NEXT_PUBLIC_API_URL no está definido. No se cargarán imágenes del CMS.",
    );
    return null;
  }

  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}/imagenes`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `[cms] Imágenes endpoint respondió con status ${response.status}.`,
      );
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(
        "[cms] Imágenes endpoint devolvió JSON inválido:",
        parseError,
      );
      return null;
    }

    if (!Array.isArray(data)) {
      console.warn("[cms] Imágenes endpoint no devolvió un array.");
      return null;
    }

    if (data.length === 0) {
      return null;
    }

    data.sort((a, b) => {
      const da = new Date(a.creadoEn || 0).getTime();
      const db = new Date(b.creadoEn || 0).getTime();
      return db - da;
    });

    return data.map((item) => ({
      id: item.id,
      url: item.url,
      titulo: item.titulo || "",
      descripcion: item.descripcion || "",
      categoria: item.galeria ?? item.categoria ?? "general",
      fecha: item.creadoEn,
    }));
  } catch (error) {
    console.error("[cms] Error al obtener imágenes:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getDocumentosFromCMS(filtros = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn(
      "[cms] NEXT_PUBLIC_API_URL no está definido. No se cargarán documentos del CMS.",
    );
    return null;
  }

  const params = new URLSearchParams();
  if (filtros.categoria) params.set("categoria", filtros.categoria);
  if (filtros.anio) params.set("anio", String(filtros.anio));
  if (filtros.trimestre) params.set("trimestre", String(filtros.trimestre));
  if (filtros.ambito) params.set("ambito", filtros.ambito);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}/documentos${qs}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `[cms] Documentos endpoint respondió con status ${response.status}.`,
      );
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(
        "[cms] Documentos endpoint devolvió JSON inválido:",
        parseError,
      );
      return null;
    }

    if (!Array.isArray(data)) {
      console.warn("[cms] Documentos endpoint no devolvió un array.");
      return null;
    }

    if (data.length === 0) {
      return null;
    }

    data.sort((a, b) => {
      const anioA = a.anio ?? 0;
      const anioB = b.anio ?? 0;
      if (anioB !== anioA) return anioB - anioA;
      const da = new Date(a.creadoEn || 0).getTime();
      const db = new Date(b.creadoEn || 0).getTime();
      return db - da;
    });

    return data.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      descripcion: item.descripcion || "",
      url: item.archivoUrl,
      tamanoBytes: item.fileSize ?? null,
      nombreArchivo: item.fileName ?? null,
      categoria: item.categoria || "otros",
      tipo: item.tipo || "PDF",
      ambito: item.ambito ?? null,
      anio: item.anio ?? null,
      trimestre: item.trimestre ?? null,
      creadoEn: item.creadoEn,
      actualizadoEn: item.actualizadoEn,
    }));
  } catch (error) {
    console.error("[cms] Error al obtener documentos:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getSevacFromCMS(filtros = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn(
      "[cms] NEXT_PUBLIC_API_URL no está definido. No se cargarán documentos SEvAC del CMS.",
    );
    return null;
  }

  const params = new URLSearchParams();
  if (filtros.categoria) params.set("categoria", filtros.categoria);
  if (filtros.anio) params.set("anio", String(filtros.anio));
  if (filtros.trimestre) params.set("trimestre", String(filtros.trimestre));
  const qs = params.toString() ? `?${params.toString()}` : "";
  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}/sevac${qs}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `[cms] SEvAC endpoint respondió con status ${response.status}.`,
      );
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(
        "[cms] SEvAC endpoint devolvió JSON inválido:",
        parseError,
      );
      return null;
    }

    if (!Array.isArray(data)) {
      console.warn("[cms] SEvAC endpoint no devolvió un array.");
      return null;
    }

    if (data.length === 0) {
      return null;
    }

    data.sort((a, b) => {
      const anioA = a.anio ?? 0;
      const anioB = b.anio ?? 0;
      if (anioB !== anioA) return anioB - anioA;
      const da = new Date(a.creadoEn || 0).getTime();
      const db = new Date(b.creadoEn || 0).getTime();
      return db - da;
    });

    return data.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      descripcion: item.descripcion || "",
      url: item.archivoUrl,
      tamanoBytes: item.fileSize ?? null,
      nombreArchivo: item.fileName ?? null,
      categoria: item.categoria || "otros",
      tipo: item.tipo || "PDF",
      anio: item.anio ?? null,
      trimestre: item.trimestre ?? null,
      creadoEn: item.creadoEn,
      actualizadoEn: item.actualizadoEn,
    }));
  } catch (error) {
    console.error("[cms] Error al obtener documentos SEvAC:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Mapea el enum `TipoMiembroCabildo` del backend al `tipo` en minúsculas
// que esperan los componentes del sitio público (PresidenteCard,
// SindicaCard, RegidorCard, DIF en CabildoSection).
const TIPO_API_TO_PUBLIC = {
  PRESIDENTE: "presidente",
  SINDICA: "sindica",
  REGIDOR: "regidor",
  DIF: "dif",
};

function mapFuncionarioCMSToPortal(item) {
  return {
    id: item.id,
    tipo: TIPO_API_TO_PUBLIC[item.tipo] || "cabildo",
    orden: item.orden ?? 0,
    nombre: item.nombre,
    cargo: item.cargo,
    administracion: item.administracion || null,
    bio: item.bio || null,
    email: item.email || null,
    telefono: item.telefono || null,
    foto: item.fotoUrl || null,
    comisiones: [],
  };
}

// Devuelve null si el CMS no responde (error de red / endpoint caído) para
// que el consumidor caiga al fallback estático de `lib/cabildo.js`. Devuelve
// [] si el CMS responde OK pero sin miembros activos — en ese caso el
// consumidor también cae al fallback, ya que el directorio NO debe verse
// vacío en producción.
// Lee la URL de la portada de Historia desde el CMS. El backend devuelve
// siempre 200 con `{ url, publicId }` (ambos null si el municipio no ha
// subido portada propia). El consumidor decide entre la URL del CMS o el
// fallback estático del repo (ver app/page.js).
export async function getPortadaHistoriaFromCMS() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}/portada-historia`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `[cms] Portada Historia endpoint respondió status ${response.status}.`,
      );
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(
        "[cms] Portada Historia endpoint devolvió JSON inválido:",
        parseError,
      );
      return null;
    }

    if (!data || typeof data !== "object") return null;
    return data.url || null;
  } catch (err) {
    if (err?.name !== "AbortError") {
      console.error("[cms] Error al obtener portada Historia:", err);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getCabildoFromCMS() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn(
      "[cms] NEXT_PUBLIC_API_URL no está definido. Usando fallback de cabildo.",
    );
    return null;
  }

  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}/funcionarios?activo=true`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `[cms] Cabildo endpoint respondió con status ${response.status}.`,
      );
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(
        "[cms] Cabildo endpoint devolvió JSON inválido:",
        parseError,
      );
      return null;
    }

    if (!Array.isArray(data)) {
      console.warn("[cms] Cabildo endpoint no devolvió un array.");
      return null;
    }

    const activos = data.filter((item) => item && item.activo !== false);
    if (activos.length === 0) return [];

    return activos
      .map(mapFuncionarioCMSToPortal)
      .sort((a, b) => a.orden - b.orden);
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error("[cms] Error al obtener cabildo:", error);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
