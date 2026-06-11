import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { playfair, inter, mono, lora } from "@/lib/fonts";
import { municipalConfig } from "@/lib/municipalConfig";
import { buildMetadata, defaultViewport } from "@/lib/seo";
import { MainNav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ToastProvider } from "@/components/ui/Toast";
import { TermsModalGate } from "@/components/layout/TermsModalGate";
import "./globals.css";

const { nombreOficial, nombreCompleto, administracion } = municipalConfig.identidad;
const ROOT_TITLE = `${nombreCompleto} | ${administracion}`;
const ROOT_DESCRIPTION = `Sitio oficial del ${nombreOficial}. Administración ${administracion}. Trámites, transparencia, gobierno y servicios para la ciudadanía.`;

const baseMetadata = buildMetadata();

export const metadata = {
  ...baseMetadata,
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  openGraph: {
    ...baseMetadata.openGraph,
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
  },
  twitter: {
    ...baseMetadata.twitter,
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
  },
};
export const viewport = defaultViewport;

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} ${mono.variable} ${lora.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[var(--color-guinda)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido principal
        </a>
        <ToastProvider>
          <TermsModalGate />
          <MainNav />
          <div id="contenido-principal" className="flex flex-1 flex-col">
            {children}
          </div>
          <Footer />
          <ScrollToTop />
        </ToastProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
