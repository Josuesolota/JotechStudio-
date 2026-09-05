# Jotech Studio — Portfólio & Site de Serviços

Site pessoal e portfólio de **Josué Solota** (Jotech Studio): mostra projetos,
serviços digitais e converte visitantes em contactos.

Construído com **Astro** (estático) + **Sanity CMS**, hospedado na **Vercel**,
e **instalável como aplicação (PWA)**.

🔗 https://jotechstudio.vercel.app

---

## Stack

| Camada     | Tecnologia                                                        |
| ---------- | ----------------------------------------------------------------- |
| Framework  | [Astro](https://astro.build) — geração estática (SSG)             |
| CMS        | [Sanity](https://sanity.io) — headless, opcional                  |
| Linguagem  | TypeScript em todo o projeto (`astro check` sem erros)            |
| Formulário | [Web3Forms](https://web3forms.com) — sem backend                  |
| App        | PWA: manifest + service worker próprios (sem dependências)        |
| Deploy     | Vercel (`vercel.json` define cabeçalhos de cache e segurança)     |

---

## Estrutura

```
brand-source/       → originais da marca (ícone e banner) para regenerar assets
public/
  icons/            → conjunto completo de ícones da PWA (48 → 512, maskable, apple)
  brand/            → banner e engrenagem otimizados para uso no site
  screenshots/      → capturas usadas pelo manifest na janela de instalação
  manifest.webmanifest
  sw.js             → service worker (cache + modo offline)
src/
  components/       → Header, Footer, Logo, Icon, ProjectCard, TerminalHero,
                      CTASection, StatsBar, ProcessSteps, FaqList,
                      CategoryFilter, PWAInstall
  data/             → site.ts (contactos/nav), services.ts (serviços, processo,
                      FAQ), projects.ts (projetos locais de fallback)
  layouts/          → BaseLayout.astro (SEO, PWA, JSON-LD, fontes)
  lib/              → sanity.ts (client), queries.ts (GROQ),
                      projects.ts (une CMS + locais), portableText.ts
  pages/            → index, projetos/, servicos, sobre, contato, offline, 404
  styles/           → global.css (design system e tokens da marca)
sanity-studio-schemas/
  project.ts        → schema para colar no seu Sanity Studio
```

---

## Comandos

| Comando            | Ação                                        |
| ------------------ | ------------------------------------------- |
| `npm install`      | Instala dependências                        |
| `npm run dev`      | Servidor local em `localhost:4321`          |
| `npm run build`    | Build de produção em `dist/`                |
| `npm run preview`  | Pré-visualiza o build de produção           |
| `npx astro check`  | Verificação de tipos (deve dar 0 erros)     |

---

## PWA — como funciona

O site é instalável no telemóvel e no desktop:

- **Manifest** (`public/manifest.webmanifest`) — nome, cores, ícones (incluindo
  `maskable` para o Android recortar corretamente), 3 atalhos rápidos
  (Projetos, Serviços, Orçamento) e capturas de ecrã.
- **Service worker** (`public/sw.js`):
  - páginas → *network-first* com fallback para cache e, em último caso, `/offline`;
  - assets com hash (`/_astro/`), ícones e imagens → *cache-first* com revalidação;
  - só intercepta pedidos `GET` da própria origem.
- **Convite de instalação** (`src/components/PWAInstall.astro`) — aparece 6 s
  depois do `beforeinstallprompt` (Chrome/Edge/Android). No iOS mostra as
  instruções de "Adicionar ao ecrã principal", já que o Safari não expõe o
  evento. Quem dispensa não volta a ver durante 30 dias; quem já instalou nunca vê.

### Publicar uma nova versão do service worker

Altere `SW_VERSION` no topo de `public/sw.js`. As caches antigas são apagadas
na ativação e o site pede a atualização imediata.

### Regenerar os ícones

Os originais estão em `brand-source/`. Para gerar todos os tamanhos de novo
(precisa de Python com Pillow: `pip install Pillow`), use o script descrito em
`docs/ICONES.md`.

---

## Projetos: CMS com rede de segurança

`src/lib/projects.ts` decide de onde vêm os projetos:

1. **Sanity tem projetos publicados** → são esses que aparecem;
2. **Sanity vazio, sem `.env` ou indisponível** → entram os projetos de
   `src/data/projects.ts`.

Assim o portfólio **nunca aparece vazio** a um potencial cliente. Os cartões
marcados com `kind: "concept"` mostram o selo *Conceito* — são peças de
demonstração, não trabalhos de clientes. Substitua-os por cases reais à medida
que os tiver.

---

## Antes de publicar, confira

- [ ] `SANITY_PROJECT_ID` no `.env` (ver `.env.example`) — opcional
- [ ] `WEB3FORMS_ACCESS_KEY` em `src/pages/contato.astro`
- [ ] Email, WhatsApp e redes em `src/data/site.ts`
- [ ] Números da secção de destaques (`STATS` em `src/data/site.ts`) — use
      apenas dados verdadeiros
- [ ] `SITE_URL` em `astro.config.mjs` se mudar de domínio (afeta sitemap,
      canonical e Open Graph) e o `Sitemap:` em `public/robots.txt`

## Deploy

Veja `TERMUX-DEPLOY.md` para o passo a passo completo (Termux → GitHub → Vercel).
