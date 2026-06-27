# getrequest marketing website

Marketing site for [getrequest.io](https://getrequest.io) — API reliability infrastructure for modern teams.

Built with [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript, and MDX for the blog.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Typography

Fonts are loaded via [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts):

- **Inter** — body and UI text
- **JetBrains Mono** — code blocks and monospace elements

## Project structure

| Path | Purpose |
|------|---------|
| `app/` | Pages, layout, SEO routes (sitemap, RSS, OG images) |
| `components/` | Shared layout and SEO components |
| `content/blog/` | MDX blog posts |
| `lib/` | Blog, metadata, formatting, and JSON-LD helpers |
| `public/` | Static assets |

## Deploy

The site is designed to deploy on [Vercel](https://vercel.com). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
