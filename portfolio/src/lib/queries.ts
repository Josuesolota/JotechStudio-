/**
 * Queries GROQ centralizadas.
 * Manter tudo aqui evita strings soltas espalhadas pelas páginas.
 */

// Lista para o grid de projetos (só os campos necessários no card)
export const PROJECTS_LIST_QUERY = `
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    summary,
    category,
    techStack,
    coverImage,
    featured,
    publishedAt
  }
`;

// Projetos em destaque, para a Home
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    summary,
    category,
    techStack,
    coverImage
  }
`;

// Case study completo de um projeto (página individual)
export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    category,
    techStack,
    coverImage,
    gallery,
    demoUrl,
    repoUrl,
    client,
    caseStudy,
    publishedAt
  }
`;

// Slugs para gerar as rotas estáticas (getStaticPaths)
export const ALL_SLUGS_QUERY = `*[_type == "project"]{ "slug": slug.current }`;
