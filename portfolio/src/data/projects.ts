/**
 * ─────────────────────────────────────────────────────────────
 * PROJETOS LOCAIS (fallback)
 * ─────────────────────────────────────────────────────────────
 * Porquê isto existe: o site lê os projetos do Sanity. Enquanto o
 * CMS não estiver configurado (ou estiver vazio), o portfólio
 * apareceria vazio — o pior cenário possível para quem vem avaliar
 * o seu trabalho. Estes projetos garantem que a página nunca fica
 * vazia.
 *
 * COMO USAR
 *  · `kind: "case"`    → trabalho real, entregue. Aparece sem selo.
 *  · `kind: "concept"` → peça de demonstração/conceito. Aparece com
 *                        o selo "Conceito" — honestidade com quem visita.
 *
 * Assim que publicar projetos no Sanity, eles passam à frente destes
 * automaticamente (ver src/lib/projects.ts). Substitua/apague os
 * conceitos à medida que tiver cases reais.
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
    title: "Painel de Trading — Deriv API",
    slug: "painel-trading-deriv",
    summary:
      "Conceito de dashboard em tempo real para acompanhamento de estratégias automatizadas: cotações via WebSocket, gestão de risco e histórico de operações.",
    category: ["fintech-trading", "web-app"],
    techStack: ["TypeScript", "React", "Deriv API", "WebSocket", "Python"],
    kind: "concept",
    publishedAt: "2025-11-02",
    body: [
      {
        heading: "A ideia",
        paragraphs: [
          "Quem opera com bots precisa de ver, num só ecrã, o que a estratégia está a fazer e quanto risco está exposto — sem abrir cinco separadores.",
        ],
      },
      {
        heading: "Como funciona",
        paragraphs: [
          "Ligação WebSocket à API da Deriv para cotações em tempo real, camada de gestão de risco que corta a operação ao atingir o limite diário definido, e registo de cada execução para análise posterior.",
        ],
      },
    ],
    results: [
      "Cotações em tempo real com reconexão automática",
      "Stop diário automático por perda acumulada",
      "Exportação do histórico para análise",
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
