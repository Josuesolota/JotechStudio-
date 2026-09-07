/**
 * Configuração central do site.
 * Alterar aqui reflete em header, footer, contato, SEO e JSON-LD —
 * nunca espalhar email/telefone/links soltos pelos componentes.
 */

export const SITE = {
  name: "Jotech Studio",
  /**
   * Nome exibido sob o ícone quando a PWA é instalada (Android "short_name"
   * do manifest, e "apple-mobile-web-app-title" no iOS). O espaço debaixo do
   * ícone é curto e corta "Jotech Studio" a meio ("Jotech Stu…") — por isso
   * aqui fica só a primeira palavra. Mantém-se em sincronia manual com
   * "short_name" em public/manifest.webmanifest (esse ficheiro é estático,
   * não lê este valor).
   */
  pwaShortName: "Jotech",
  tagline: "Automação · Inovação · Transformação",
  shortDescription:
    "Estúdio digital de Josué Solota: sites, landing pages, e-commerce e automações — com engenharia de nível fintech.",
  url: "https://jotechstudio.vercel.app",
  locale: "pt-PT",
  themeColor: "#04070f",
  founder: "Josué Solota",
  role: "Desenvolvedor Full-Stack & Trader Algorítmico",
  location: "Angola · Remoto para todo o mundo",
} as const;

export const CONTACT = {
  email: "jotechstudio@gmail.com",
  whatsapp: "https://wa.me/message/THY2DHHOV5AJA1",
  github: "https://github.com/Josuesolota/",
  linkedin: "https://www.linkedin.com/in/josue-solota/",
} as const;

export const NAV_LINKS = [
  { href: "/projetos", label: "Projetos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

/**
 * Faixa de destaques da Home.
 * ⚠️ São COMPROMISSOS e áreas de atuação, não métricas inventadas.
 * Se quiser exibir números reais (nº de projetos, clientes, anos),
 * substitua aqui — mas só com dados verdadeiros.
 */
export const STATS = [
  { value: "< 24h", label: "resposta ao seu pedido" },
  { value: "100/100", label: "meta de performance Lighthouse" },
  { value: "Full-stack", label: "do design ao deploy" },
  { value: "PT · EN", label: "idiomas de trabalho" },
] as const;
