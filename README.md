# Plantilla Municipal

Plantilla maestra para portales municipales, construida con Next.js (App Router),
React 19 y Tailwind CSS 4. Es la **base reutilizable** para clonar el sitio de
cualquier municipio: la estructura, los componentes y la lógica ya están listos;
solo se llena el contenido por municipio.

> **¿Vas a clonar un municipio nuevo?** Lee **[`PLANTILLA_README.md`](PLANTILLA_README.md)** —
> ahí está el paso a paso completo (qué llenar, qué reemplazar y qué NO tocar).

## 🚀 Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## 🔧 Variables de entorno

Copiar `.env.example` a `.env.local` y completar los valores:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_MUNICIPIO_SLUG` — slug del municipio para los endpoints del CMS.
- `WEB3FORMS_ACCESS_KEY` / `NEXT_PUBLIC_WEB3FORMS_KEY` — endpoint de formularios.
- `NEXT_PUBLIC_SITE_URL` — URL canónica del sitio (sitemap, robots, SEO).
- `NEXT_PUBLIC_API_URL` — backend CMS (opcional; vacío = solo fallbacks estáticos).

## 📚 Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- react-aria-components + @radix-ui (dialog, accordion, dropdown, tabs)
- framer-motion
- embla-carousel
- next-cloudinary + sharp
