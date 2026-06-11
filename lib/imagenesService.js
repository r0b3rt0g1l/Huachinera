import { getImagenesFromCMS } from "@/lib/cms";

let _cache = null;
let _cacheTimestamp = 0;
const CACHE_TTL = 30 * 1000;

async function getImagenes() {
  const now = Date.now();
  if (_cache && now - _cacheTimestamp < CACHE_TTL) {
    return _cache;
  }
  const cms = await getImagenesFromCMS();
  const result = cms || [];
  _cache = result;
  _cacheTimestamp = now;
  return result;
}

export async function getAllImagenes() {
  return getImagenes();
}

export async function getImagenesPorCategoria(categoria) {
  const all = await getImagenes();
  if (!categoria || categoria === "todas") return all;
  return all.filter((img) => img.categoria === categoria);
}

export const CATEGORIAS_IMAGENES = [
  { value: "todas", label: "Todas" },
  { value: "galeria", label: "Galería" },
  { value: "eventos", label: "Eventos" },
  { value: "funcionarios", label: "Funcionarios" },
  { value: "general", label: "General" },
  { value: "hero", label: "Banners" },
];
