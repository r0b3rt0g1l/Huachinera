import { municipalConfig } from "@/lib/municipalConfig";
import { buildMetadata } from "@/lib/seo";
import { getNoticiasRecientes } from "@/lib/noticiasService";
import { getPortadaHistoriaFromCMS } from "@/lib/cms";
import { HeroSection } from "@/components/home/HeroSection";
import { AccionesRecientes } from "@/components/home/AccionesRecientes";
import { ConoceMunicipio } from "@/components/home/ConoceMunicipio";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Inicio",
  description: `Portal institucional del ${municipalConfig.identidad.nombreOficial}. Transparencia, gobierno, turismo y servicios al ciudadano. Administración ${municipalConfig.identidad.administracion}.`,
});

export default async function HomePage() {
  // Lecturas en paralelo: noticias + portada de Historia. Ambas degradan
  // elegante a su fallback si el CMS no responde.
  const [noticiasRecientes, portadaUrl] = await Promise.all([
    getNoticiasRecientes(3),
    getPortadaHistoriaFromCMS(),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <ConoceMunicipio portadaUrl={portadaUrl} />
      <AccionesRecientes noticias={noticiasRecientes} />
    </main>
  );
}
