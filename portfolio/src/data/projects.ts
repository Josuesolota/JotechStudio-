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
    coverUrl: "/projects/jotech-studio-cover.jpg",
    coverAlt: "Ícone da marca Jotech Studio — engrenagem com circuito azul",
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
    title: "Neon Trading",
    slug: "neon-trading",
    summary:
      "Plataforma de negociação de contratos 'último dígito' na Deriv, com 15 robôs de sinal algorítmicos, gestão de risco automática e interface neon-dark em tempo real.",
    category: ["fintech-trading", "web-app"],
    techStack: ["Next.js", "TypeScript", "FastAPI", "Supabase", "Deriv API", "Tailwind CSS"],
    coverUrl: "/projects/neon-trading-cover.jpg",
    coverAlt: "Ícone da Neon Trading — gráfico de candlesticks com seta ascendente, em gradiente azul-magenta",
    demoUrl: "https://neon-trading.vercel.app/",
    repoUrl: "https://github.com/Josuesolota/Neon-Trading-Platform-",
    kind: "case",
    featured: false,
    publishedAt: "2026-09-10",
    body: [
      {
        heading: "O problema",
        paragraphs: [
          "Quem negoceia contratos de 'último dígito' na Deriv (Even/Odd, Over/Under, Matches/Differs) normalmente faz isso à mão — sem gestão de risco automática, sem histórico organizado por produto e a arriscar perder o rasto de um trade aberto se a página recarregar a meio da operação.",
        ],
      },
      {
        heading: "A solução",
        paragraphs: [
          "A Neon Trading liga-se diretamente ao WebSocket da Deriv para ticks, cotações e execução, com 15 robôs de sinal algorítmicos — 5 por produto — que leem apenas estatística de frequência de dígitos, cada um configurável só para alertar ou para negociar em auto-execução. Um gestor de risco aplica stop loss diário, take profit diário e limite de trades por hora, e reconcilia automaticamente contratos abertos se a página recarregar a meio de uma operação.",
          "O backend, em FastAPI, trata apenas de autenticação (OAuth da Deriv, tokens cifrados com AES-256-GCM) e persistência em Supabase — nunca fica no caminho crítico de uma compra, que vai direta do browser para a Deriv.",
        ],
      },
      {
        heading: "O resultado",
        paragraphs: [
          "Uma interface neon-dark bilingue (PT/EN), pensada para sessões longas de ecrã, com histórico e análise — curva de capital, taxa de ganho e distribuição por produto — para quem quer negociar com disciplina em vez de instinto.",
        ],
      },
    ],
    results: [
      "15 robôs de sinal algorítmicos (5 por produto), com alerta ou auto-execução",
      "Gestão de risco: stop loss diário, take profit diário, limite de trades por hora",
      "Reconciliação automática de contratos abertos após recarregar a página",
      "Histórico e análise com curva de capital e taxa de ganho, em PT/EN",
    ],
  },
  {
    // Nota: este é o site de apresentação/conversão da Kairos
    // (landing-page-kairos-bay.vercel.app) — distinto da própria plataforma
    // (app, em kairos-lemon-rho.vercel.app), que é gerida separadamente no
    // Sanity. Capa com o ícone da marca Kairos (relógio + seta ascendente),
    // igual ao usado na capa da Kairos Trading Platform no Sanity — a pedido
    // do utilizador, já que landing page e app partilham a mesma identidade.
    title: "Kairos — Landing Page",
    slug: "kairos-landing-page",
    summary:
      "Página de apresentação e conversão da Kairos, plataforma de trading algorítmico na Deriv — o primeiro contacto de quem ainda não é utilizador, antes de entrar na app.",
    category: ["landing-page", "fintech-trading"],
    techStack: ["TypeScript", "React", "Deriv API"],
    coverUrl: "/projects/kairos-landing-page-cover-v2.jpg",
    coverAlt: "Ícone da marca Kairos — relógio com seta de tendência ascendente",
    demoUrl: "https://landing-page-kairos-bay.vercel.app/",
    kind: "case",
    featured: false,
    publishedAt: "2026-06-15",
    body: [
      {
        heading: "O problema",
        paragraphs: [
          "Um visitante que ainda não conhece a Kairos precisa de decidir, em segundos, se vale a pena criar conta. Colocar essa decisão dentro da própria app de trading distrai de quem já é utilizador e sobrecarrega quem ainda está a avaliar.",
        ],
      },
      {
        heading: "A solução",
        paragraphs: [
          "Uma página dedicada, separada da app (kairos-lemon-rho.vercel.app), focada só em apresentar a proposta de valor: os 4 produtos de negociação, os robôs automáticos disponíveis, a execução em milissegundos e os mercados sintéticos da Deriv abertos 24/7. O caminho para criar conta — Deriv, Airtm ou diretamente na Kairos — fica sempre visível, sem obrigar a percorrer a app primeiro.",
        ],
      },
      {
        heading: "O resultado",
        paragraphs: [
          "Uma porta de entrada mais leve e direta para a Kairos, que deixa a app focada em quem já negoceia e a landing page focada em converter quem ainda está a decidir.",
        ],
      },
    ],
    results: [
      "Apresentação clara dos 4 produtos e 12 robôs de negociação",
      "Caminho direto para criar conta Deriv, Airtm ou Kairos",
      "App de trading e página de conversão mantidas separadas",
    ],
  },
  {
    title: "Digital Lens",
    slug: "digital-lens",
    summary:
      "Agência digital com site institucional, catálogo de serviços em 4 pilares e loja com checkout Stripe — tudo num único PWA instalável.",
    category: ["web-app", "landing-page"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "NextAuth", "Neon"],
    coverUrl: "/projects/digital-lens-cover-v2.jpg",
    coverAlt: "Secção da Digital Lens: descrição dos serviços e botão 'Iniciar projeto'",
    demoUrl: "https://digitallens.vercel.app/",
    repoUrl: "https://github.com/Josuesolota/Digital_Lens",
    kind: "case",
    featured: false,
    publishedAt: "2026-07-01",
    body: [
      {
        heading: "O problema",
        paragraphs: [
          "Uma agência que vende desenvolvimento web, inteligência artificial, marketing digital e locução precisa de um site que prove essa amplitude sem parecer disperso — e, se também vende produtos ou pacotes, uma loja funcional em vez de um link externo avulso.",
        ],
      },
      {
        heading: "A solução",
        paragraphs: [
          "Um site institucional em Next.js organizado em 4 pilares de especialidade — Desenvolvimento Web, Inteligência Artificial, Marketing Digital e Locução & Narração — cada um com o seu catálogo de serviços. Junto, uma loja completa com carrinho, checkout via Stripe e área de cliente protegida por autenticação (NextAuth), tudo servido como PWA instalável, com página própria para funcionar sem rede.",
        ],
      },
      {
        heading: "O resultado",
        paragraphs: [
          "Um único site que funciona como cartão de visita, catálogo e loja — sem depender de plataformas externas de terceiros para vender.",
        ],
      },
    ],
    results: [
      "Loja com checkout Stripe e conta de cliente protegida por autenticação",
      "Catálogo de serviços organizado em 4 pilares de especialidade",
      "PWA instalável, com página própria para uso sem rede",
    ],
  },
  {
    title: "Polímata",
    slug: "polimata",
    summary:
      "Plataforma de e-learning gamificada, com cursos de Trading e Oratória & Retórica em texto, áudio e vídeo, XP, sequências diárias e ranking entre alunos.",
    category: ["web-app", "landing-page"],
    techStack: ["Next.js", "TypeScript", "MongoDB", "Auth.js", "Tailwind CSS", "PWA"],
    coverUrl: "/projects/polimata-cover.jpg",
    coverAlt: "Ícone da Polímata — capelo de formatura com circuito e rede global, em vermelho",
    demoUrl: "https://polimata-six.vercel.app/",
    repoUrl: "https://github.com/Josuesolota/Polimata",
    kind: "case",
    featured: false,
    publishedAt: "2026-09-01",
    body: [
      {
        heading: "O problema",
        paragraphs: [
          "A maioria dos cursos online termina no vídeo: sem acompanhar o progresso, sem criar hábito de estudo e sem nada que prove a quem está a aprender que está mesmo a avançar — o que faz a maior parte das pessoas desistir a meio.",
        ],
      },
      {
        heading: "A solução",
        paragraphs: [
          "A Polímata organiza o conteúdo em cursos e aulas — texto, áudio e vídeo — sobre Trading e Oratória & Retórica, e transforma o avanço num jogo: XP por aula concluída, sequência diária, dez níveis e distintivos até ao topo, batizado precisamente de 'Polímata'.",
          "Por trás, um painel de administração próprio gere utilizadores, artigos de blog, aulas, cursos e notificações — tudo servido como PWA instalável, com notificações push e funcionamento offline.",
        ],
      },
      {
        heading: "O resultado",
        paragraphs: [
          "Uma plataforma de e-learning completa — autenticação, base de dados, gamificação e notificações — construída como monorepo com Next.js, já preparada para crescer com novos cursos e formatos.",
        ],
      },
    ],
    results: [
      "Cursos em texto, áudio e vídeo, com quiz final e XP por aula",
      "Gamificação: sequência diária, dez níveis, distintivos e ranking entre alunos",
      "Painel de administração para cursos, aulas, artigos, utilizadores e notificações",
      "PWA instalável, com notificações push e modo offline",
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
