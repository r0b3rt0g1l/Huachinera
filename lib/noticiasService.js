import { getNoticiasFromCMS, getNoticiaPorSlugFromCMS } from "@/lib/cms";
import {
  noticias as noticiasFallback,
  comunicados,
  getNoticiaPorSlug as getHardcodedPorSlug,
} from "@/lib/noticias";

export { comunicados };

let _cachedCMSNoticias = null;
let _cacheTimestamp = 0;
const CACHE_TTL = 30 * 1000;

async function getNoticias() {
  const now = Date.now();
  if (_cachedCMSNoticias && now - _cacheTimestamp < CACHE_TTL) {
    return _cachedCMSNoticias;
  }
  const cms = await getNoticiasFromCMS();
  const result = cms && cms.length > 0 ? cms : noticiasFallback;
  _cachedCMSNoticias = result;
  _cacheTimestamp = now;
  return result;
}

export async function getNoticiasAll() {
  return getNoticias();
}

export async function getNoticiasRecientes(limit = 3) {
  const all = await getNoticias();
  return [...all]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, limit);
}

export async function getNoticiaPorSlug(slug) {
  // Primero pegamos al endpoint detalle del backend: a diferencia del
  // listado, sí devuelve el `contenido` completo de la noticia.
  const fromCMSDetail = await getNoticiaPorSlugFromCMS(slug);
  if (fromCMSDetail) return fromCMSDetail;

  // Fallback intermedio: buscar en la lista cacheada. Útil si el endpoint
  // detalle no responde pero la lista sí está disponible. La noticia
  // devuelta no tendrá contenido completo, pero al menos no es 404.
  const cmsNoticias = await getNoticias();
  const fromCMSList = cmsNoticias.find((n) => n.slug === slug);
  if (fromCMSList) return fromCMSList;

  // Último recurso: noticias hardcoded del template.
  return getHardcodedPorSlug(slug);
}

export async function getNoticiasRelacionadas(slugActual, limit = 3) {
  const all = await getNoticias();
  return all
    .filter((n) => n.slug !== slugActual)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, limit);
}
