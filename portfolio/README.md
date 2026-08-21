# Portfolio — Dev Full-Stack & Trading Systems

Site de portfólio construído com **Astro** + **Sanity CMS**, hospedado na **Vercel**.

## Stack
- [Astro](https://astro.build) — geração estática (SSG), performance máxima
- [Sanity](https://sanity.io) — CMS headless para gerenciar projetos sem tocar em código
- TypeScript em todo o projeto
- Formulário de contato via [Web3Forms](https://web3forms.com) (sem backend)

## Estrutura
```
src/
  components/    → Header, Footer, ProjectCard, TerminalHero, CTASection, CategoryFilter
  layouts/        → BaseLayout.astro (SEO, fontes, estrutura HTML)
  lib/            → sanity.ts (client), queries.ts (GROQ), portableText.ts (case studies)
  pages/          → index, projetos/, sobre, servicos, contato, 404
  styles/         → global.css (design tokens)
  types/          → project.ts (tipagem do modelo de dados)
sanity-studio-schemas/
  project.ts      → schema para colar no seu Sanity Studio
```

## Comandos
| Comando           | Ação                                       |
| ----------------- | ------------------------------------------ |
| `npm install`      | Instala dependências                       |
| `npm run dev`      | Servidor local em `localhost:4321`         |
| `npm run build`    | Build de produção em `dist/`               |
| `npm run preview`  | Pré-visualiza o build de produção          |

## Deploy
Veja `TERMUX-DEPLOY.md` para o passo a passo completo (Termux → GitHub → Vercel).

## Antes de publicar, configure
- [ ] `WEB3FORMS_ACCESS_KEY` em `src/pages/contato.astro`
- [ ] Email, WhatsApp e redes sociais (Footer.astro e contato.astro)
- [ ] `SITE_URL` em `astro.config.mjs` (após o primeiro deploy)
- [ ] Ao menos 1 projeto publicado no Sanity Studio
