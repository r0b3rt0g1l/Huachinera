# Portal H. Ayuntamiento de Huachinera, Sonora

Sitio público del Municipio de Huachinera (administración 2024-2027), construido
con Next.js 16 (App Router), React 19 y Tailwind CSS 4. Consume contenido del CMS
multi-municipio (`cmsmunicipal`) filtrado por el slug `huachinera`; si el tenant
está vacío o el backend no responde, cae a fallbacks estáticos sin romperse.

Derivado de `plantilla-municipal` por **Northa Digital**.

## 🚀 Desarrollo local

```bash
npm install
cp .env.example .env.local   # ajusta los valores
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

> El build **falla a propósito** si `NEXT_PUBLIC_MUNICIPIO_SLUG` no está definido
> (lib/cms.js GUARD 1). En local, expórtalo o usa `.env.local`.

## 🔧 Variables de entorno

| Variable | Obligatoria | Notas |
|---|---|---|
| `NEXT_PUBLIC_MUNICIPIO_SLUG` | **Sí (build)** | `huachinera` — se hornea en el bundle |
| `NEXT_PUBLIC_API_URL` | **Sí en Vercel** | `https://cmsmunicipal.onrender.com` |
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URL canónica (sitemap, robots, SEO) |
| `WEB3FORMS_ACCESS_KEY` / `NEXT_PUBLIC_WEB3FORMS_KEY` | No | Formularios (se activan cuando haya correo oficial) |

En Vercel, las 3 `NEXT_PUBLIC_*` deben existir **antes del primer build** (sin
marcar "Sensitive"); un redeploy de un build viejo no las hornea.

## 📚 Stack

Next.js 16 · React 19 · Tailwind CSS 4 · react-aria-components + @radix-ui ·
framer-motion · embla-carousel · next-cloudinary + sharp.
