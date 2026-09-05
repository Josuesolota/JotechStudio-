/**
 * ─────────────────────────────────────────────────────────────
 * PROJETOS LOCAIS
 * ─────────────────────────────────────────────────────────────
 * Porquê isto existe: o portfólio junta dois catálogos — os projetos
 * publicados no Sanity e os declarados aqui. Isto permite adicionar
 * um projeto diretamente por código (como este ficheiro) sem depender
 * de acesso ao Sanity Studio, e garante que a lista nunca aparece
 * vazia a um potencial cliente.
 *
 * PRIORIDADE: se um projeto existir nos dois catálogos com o mesmo
 * `slug`, a versão do Sanity é que conta (ver src/lib/projects.ts).
 * Fora isso, os dois catálogos aparecem juntos, ordenados por data.
 *
 * COMO USAR
 *  · `kind: "case"`    → trabalho ou produto real. Aparece sem selo.
 *  · `kind: "concept"` → peça de demonstração/conceito. Aparece com
 *                        o selo "Conceito" — honestidade com quem visita.
 *  · `featured: true`  → também entra na secção de destaque da Home
 *                        (junto com os destaques marcados no Sanity).
 */

import type { ProjectCategory } from "../types/project";

export interface LocalProject {
  title: string;
  slug: string;
  summary: string;
  category: ProjectCategory[];
  techStack: string[];
  /** Caminho de uma imagem em /public. Sem imagem → capa gerada automaticamente. */
  coverUrl?: string;
  coverAlt?: string;
  demoUrl?: string;
  repoUrl?: string;
  kind: "case" | "concept";
  /** Aparece também nos "Projetos em destaque" da Home. */
  featured?: boolean;
  /** Case study em parágrafos simples (renderizado em /projetos/[slug]). */
  body?: { heading?: string; paragraphs: string[] }[];
  results?: string[];
  publishedAt: string;
}

export const LOCAL_PROJECTS: LocalProject[] = [
  {
    title: "Jotech Studio — Portfólio PWA",
    slug: "jotech-studio-portfolio",
    summary:
      "Este próprio site: portfólio instalável como aplicação (PWA), estático, com CMS headless e pontuação máxima de performance.",
    category: ["web-app", "landing-page"],
    techStack: ["Astro", "TypeScript", "Sanity CMS", "PWA", "Vercel"],
    coverUrl: "/brand/banner.jpg",
    coverAlt: "Banner da marca Jotech Studio",
    demoUrl: "https://jotechstudio.vercel.app",
    repoUrl: "https://github.com/Josuesolota/JotechStudio-",
    kind: "case",
    featured: true,
    publishedAt: "2026-01-15",
    body: [
      {
        heading: "O problema",
        paragraphs: [
          "Um portfólio precisa de fazer duas coisas ao mesmo tempo: provar competência técnica e converter visitantes em conversas. A maioria falha numa das duas — ou é bonito e lento, ou é rápido e esquecível.",
        ],
      },
      {
        heading: "A solução",
        paragraphs: [
          "Construí o site em Astro com geração estática: o HTML já vai pronto para o browser, sem JavaScript de framework a bloquear o carregamento. O conteúdo dos projetos vem de um CMS headless (Sanity), o que permite publicar novos cases sem tocar em código.",
          "A camada PWA (service worker + manifest) torna o site instalável no telemóvel e no desktop, com funcionamento offline das páginas já visitadas — a mesma tecnologia que uso em dashboards de trading, onde a ligação nunca pode ser um ponto único de falha.",
        ],
      },
      {
        heading: "O resultado",
        paragraphs: [
          "Site instalável, com carregamento quase instantâneo, acessível por teclado e otimizado para partilha em redes sociais.",
        ],
      },
    ],
    results: [
      "Instalável como app em Android, iOS e desktop",
      "Funciona offline após a primeira visita",
      "HTML estático — sem custos de servidor",
    ],
  },
  {
    title: "Flash Trading",
    slug: "flash-trading",
    summary:
      "App de negociação de opções profissional com login direto via Deriv, estratégias assistidas por IA e onboarding completo para quem ainda não tem conta.",
    category: ["fintech-trading", "web-app"],
    techStack: ["TypeScript", "React", "Deriv API", "PWA"],
    coverUrl: "/projects/flash-trading-cover.jpg",
    coverAlt: "Ícone da Flash Trading — um raio em chamas laranja sobre fundo escuro",
    demoUrl: "https://flash-trading.vercel.app/",
    kind: "case",
    featured: true,
    publishedAt: "2026-05-20",
    body: [
      {
        heading: "O problema",
        paragraphs: [
          "Quem já opera na Deriv não quer criar mais uma conta nem reaprender uma interface do zero — quer entrar e negociar. E quem ainda não tem conta precisa de um caminho claro para abrir uma, sem se perder em páginas de ajuda.",
        ],
      },
      {
        heading: "A solução",
        paragraphs: [
          "A Flash Trading autentica diretamente com a conta Deriv do utilizador, elimina o registo duplicado e centra a experiência em negociação de opções binárias com estratégias assistidas por IA. Para quem ainda não tem conta, o próprio ecrã inicial oferece o caminho de criação de conta Deriv e de abertura de carteira Airtm, sem sair da app.",
          "A comunidade fica a um toque de distância — WhatsApp e Telegram integrados diretamente na tela principal, para dúvidas e sinais em tempo real.",
        ],
      },
      {
        heading: "O resultado",
        paragraphs: [
          "Uma app instalável (PWA) com o visual de assinatura da marca — o raio laranja — que reduz para um único ecrã a distância entre abrir a app e começar a operar.",
        ],
      },
    ],
    results: [
      "Login direto com a conta Deriv, sem registo duplicado",
      "Onboarding embutido para quem ainda não tem conta Deriv ou Airtm",
      "Comunidade (WhatsApp/Telegram) integrada na tela principal",
    ],
  },
  {
    title: "Loja online — moda local",
    slug: "ecommerce-moda-local",
    summary:
      "Conceito de e-commerce com checkout em três passos, pagamentos locais e gestão de stock — pensado para pequenos negócios que vendem por redes sociais.",
    category: ["web-app", "landing-page"],
    techStack: ["Astro", "Stripe", "TypeScript", "Sanity CMS"],
    kind: "concept",
    publishedAt: "2025-09-20",
    body: [
      {
        heading: "A ideia",
        paragraphs: [
          "Muitos negócios vendem por DM no Instagram e perdem encomendas por falta de um fluxo de pagamento simples. O objetivo foi reduzir o caminho entre 'gostei' e 'pago' ao mínimo possível.",
        ],
      },
      {
        heading: "Como funciona",
        paragraphs: [
          "Catálogo estático gerado em build (rápido e barato de alojar), carrinho no cliente e checkout delegado a um fornecedor de pagamentos seguro. O lojista gere produtos e stock num painel simples.",
        ],
      },
    ],
    results: [
      "Checkout em 3 passos, sem registo obrigatório",
      "Gestão de produtos sem conhecimentos técnicos",
      "Emails automáticos de confirmação",
    ],
  },
  {
    title: "Automação de relatórios",
    slug: "automacao-relatorios",
    summary:
      "Conceito de pipeline que recolhe dados de várias fontes, gera relatórios em PDF e envia por email todas as segundas — substituindo horas de trabalho manual.",
    category: ["automacao"],
    techStack: ["Python", "Pandas", "APIs REST", "Cron"],
    kind: "concept",
    publishedAt: "2025-07-11",
    body: [
      {
        heading: "A ideia",
        paragraphs: [
          "Equipas pequenas perdem meio dia por semana a copiar números entre folhas de cálculo. Isso é trabalho de máquina.",
        ],
      },
      {
        heading: "Como funciona",
        paragraphs: [
          "Um agendador corre o pipeline, que consulta as APIs, consolida os dados, aplica as regras de negócio e produz um PDF com os gráficos certos — entregue no email de quem decide.",
        ],
      },
    ],
    results: [
      "Horas de trabalho manual eliminadas por semana",
      "Zero erros de cópia entre folhas",
      "Relatório sempre no mesmo formato e horário",
    ],
  },
];
