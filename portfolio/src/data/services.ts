/**
 * Catálogo de serviços — fonte única usada na Home (resumo) e em /servicos.
 * `icon` é o nome de um ícone SVG inline definido em components/Icon.astro.
 */

export interface Service {
  slug: string;
  icon: string;
  title: string;
  pitch: string;
  description: string;
  deliverables: string[];
  timeline: string;
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: "landing-pages",
    icon: "rocket",
    title: "Landing Pages de conversão",
    pitch: "Uma página, um objetivo: transformar visitas em clientes.",
    description:
      "Páginas rápidas, com copy orientada a benefício, prova social e um único caminho para a ação. Construídas para carregar em menos de um segundo e converter em qualquer dispositivo.",
    deliverables: [
      "Estrutura de copy orientada a conversão",
      "Design responsivo exclusivo (sem templates)",
      "Formulário / WhatsApp integrado",
      "Analytics e eventos de conversão",
      "SEO técnico e Open Graph",
    ],
    timeline: "3 a 7 dias",
    featured: true,
  },
  {
    slug: "sites-institucionais",
    icon: "layers",
    title: "Sites institucionais",
    pitch: "A presença digital que dá credibilidade ao seu negócio.",
    description:
      "Sites de várias páginas para empresas e profissionais que precisam de ser levados a sério: identidade consistente, conteúdo editável e desempenho impecável.",
    deliverables: [
      "Até 6 páginas (Home, Sobre, Serviços, Blog, Contato…)",
      "CMS para editar textos e imagens sem tocar em código",
      "Blog / área de notícias opcional",
      "Otimização SEO e sitemap",
      "Formulário de contato e integração com email",
    ],
    timeline: "1 a 3 semanas",
    featured: true,
  },
  {
    slug: "ecommerce",
    icon: "cart",
    title: "E-commerce",
    pitch: "Loja online pronta para vender — não apenas para existir.",
    description:
      "Lojas com checkout fluido, pagamentos seguros e gestão simples de produtos. Foco no que importa: menos passos entre o produto e o pagamento concluído.",
    deliverables: [
      "Catálogo, carrinho e checkout otimizados",
      "Pagamentos (Stripe / MB Way / multibanco / PayPal)",
      "Gestão de produtos, stock e encomendas",
      "Emails transacionais automáticos",
      "Painel de métricas de vendas",
    ],
    timeline: "3 a 6 semanas",
    featured: true,
  },
  {
    slug: "web-apps",
    icon: "code",
    title: "Web apps & dashboards",
    pitch: "Software sob medida quando a folha de cálculo já não chega.",
    description:
      "Aplicações internas, portais de cliente e dashboards em tempo real. Arquitetura tipada, testável e preparada para crescer — com autenticação e permissões a sério.",
    deliverables: [
      "Autenticação, papéis e permissões",
      "Dashboards e visualização de dados",
      "Integração com APIs e bases de dados",
      "Documentação técnica de entrega",
      "Deploy e monitorização",
    ],
    timeline: "4 semanas ou mais",
    featured: true,
  },
  {
    slug: "trading-automacao",
    icon: "chart",
    title: "Trading algorítmico & automação",
    pitch: "A minha especialidade rara: mercados + engenharia.",
    description:
      "Bots e estratégias automatizadas com integração à API da Deriv, backtesting, gestão de risco e monitorização. Também automatizo processos de negócio que hoje consomem horas manuais.",
    deliverables: [
      "Integração com a API da Deriv (WebSocket)",
      "Backtesting e métricas de performance",
      "Regras de gestão de risco e stop automático",
      "Alertas por Telegram / email",
      "Automação de tarefas repetitivas e relatórios",
    ],
    timeline: "2 a 8 semanas",
    featured: true,
  },
  {
    slug: "manutencao",
    icon: "shield",
    title: "Manutenção & performance",
    pitch: "O seu site já existe — falta funcionar bem.",
    description:
      "Auditoria técnica, correção de performance, acessibilidade e SEO, migrações e suporte contínuo. Ideal para sites lentos, desatualizados ou sem quem cuide deles.",
    deliverables: [
      "Auditoria de performance e Core Web Vitals",
      "Correções de acessibilidade e SEO",
      "Atualizações de segurança e dependências",
      "Backups e monitorização de uptime",
      "Suporte mensal com horas dedicadas",
    ],
    timeline: "contínuo",
  },
];

/** Passos do processo de trabalho, exibidos em /servicos e na Home. */
export const PROCESS = [
  {
    title: "Briefing",
    description:
      "Conversa de 30 minutos para entender o problema real, o público e o que conta como sucesso. Sem compromisso.",
  },
  {
    title: "Proposta",
    description:
      "Escopo, prazo e valor por escrito. Sem letras miúdas, sem surpresas a meio do projeto.",
  },
  {
    title: "Design & desenvolvimento",
    description:
      "Entregas incrementais com link de pré-visualização. Você acompanha e comenta a cada etapa.",
  },
  {
    title: "Deploy & acompanhamento",
    description:
      "Publicação, formação de utilização e 30 dias de suporte incluído para ajustes.",
  },
] as const;

/** Perguntas frequentes — reduz atrito antes do contato. */
export const FAQ = [
  {
    question: "Quanto custa um site?",
    answer:
      "Depende do escopo. Uma landing page bem feita e uma loja online completa são projetos muito diferentes. Envie o seu contexto pelo formulário e recebe uma proposta com valor fechado — sem custo e sem compromisso.",
  },
  {
    question: "Em quanto tempo fica pronto?",
    answer:
      "Landing pages costumam ficar prontas entre 3 e 7 dias. Sites institucionais, de 1 a 3 semanas. E-commerce e web apps, a partir de 3 semanas. O prazo exato entra na proposta.",
  },
  {
    question: "Eu consigo editar o conteúdo depois?",
    answer:
      "Sim. Entrego com um CMS onde altera textos, imagens e publicações sem tocar em código — e mostro como usar numa sessão de formação incluída.",
  },
  {
    question: "Trabalha com clientes de fora de Angola?",
    answer:
      "Sim, trabalho 100% remoto com clientes de qualquer país, em português ou inglês. Reuniões por videochamada e entregas acompanhadas online.",
  },
  {
    question: "O que preciso de ter antes de começar?",
    answer:
      "Idealmente: uma ideia do objetivo do site, textos ou referências do que gosta, e logo/identidade se já tiver. Se não tiver nada disso, ajudo a construir do zero.",
  },
] as const;
