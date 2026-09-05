/**
 * Camada única de acesso a projetos.
 *
 * Regra: o Sanity manda. Se houver projetos publicados no CMS, são
 * esses que aparecem. Se o CMS estiver vazio ou indisponível (build
 * sem .env, por exemplo), caímos nos projetos locais de src/data —
 * o portfólio nunca aparece vazio a um potencial cliente.
 */

import { safeFetch, urlFor } from "./sanity";
import {
  ALL_SLUGS_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECTS_LIST_QUERY,
  PROJECT_BY_SLUG_QUERY,
} from "./queries";
import type { Project, ProjectCategory } from "../types/project";
import { LOCAL_PROJECTS, type LocalProject } from "../data/projects";

/** Forma normalizada consumida pelos componentes (cartão e página de detalhe). */
export interface ProjectView {
  title: string;
  slug: string;
  summary: string;
  category: ProjectCategory[];
  techStack: string[];
  coverUrl?: string;
  coverAlt?: string;
  gallery?: { url: string; alt: string }[];
  demoUrl?: string;
  repoUrl?: string;
  client?: string;
  kind: "case" | "concept";
  source: "sanity" | "local";
  publishedAt?: string;
  /** HTML do case study (Sanity/PortableText) */
  bodyHtml?: string;
  /** Case study local em blocos simples */
  bodyBlocks?: { heading?: string; paragraphs: string[] }[];
  results?: string[];
}

export const CATEGORY_LABELS: Record<string, string> = {
  "web-app": "Web App",
  "fintech-trading": "Fintech / Trading",
  automacao: "Automação",
  "landing-page": "Landing Page",
  outro: "Outro",
};

function fromLocal(p: LocalProject): ProjectView {
  return {
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    category: p.category ?? [],
    techStack: p.techStack ?? [],
    coverUrl: p.coverUrl,
    coverAlt: p.coverAlt ?? p.title,
    demoUrl: p.demoUrl,
    repoUrl: p.repoUrl,
    kind: p.kind,
    source: "local",
    publishedAt: p.publishedAt,
    bodyBlocks: p.body,
    results: p.results,
  };
}

function fromSanity(p: Project, bodyHtml?: string): ProjectView {
  return {
    title: p.title,
    slug: p.slug?.current ?? "",
    summary: p.summary,
    category: p.category ?? [],
    techStack: p.techStack ?? [],
    coverUrl: p.coverImage ? urlFor(p.coverImage).width(960).height(600).fit("crop").url() : undefined,
    coverAlt: p.coverImage?.alt ?? p.title,
    gallery: p.gallery?.map((img) => ({ url: urlFor(img).width(1200).url(), alt: img.alt ?? "" })),
    demoUrl: p.demoUrl,
    repoUrl: p.repoUrl,
    client: p.client,
    kind: "case",
    source: "sanity",
    publishedAt: p.publishedAt,
    bodyHtml,
  };
}

const byDateDesc = (a: ProjectView, b: ProjectView) =>
  (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");

/** Todos os projetos para a página /projetos. */
export async function getAllProjects(): Promise<ProjectView[]> {
  const remote = await safeFetch<Project[]>(PROJECTS_LIST_QUERY, {}, []);
  if (remote.length > 0) return remote.map((p) => fromSanity(p)).sort(byDateDesc);
  return LOCAL_PROJECTS.map(fromLocal).sort(byDateDesc);
}

/** Destaques para a Home (máx. 3). */
export async function getFeaturedProjects(limit = 3): Promise<ProjectView[]> {
  const remote = await safeFetch<Project[]>(FEATURED_PROJECTS_QUERY, {}, []);
  if (remote.length > 0) return remote.map((p) => fromSanity(p)).slice(0, limit);

  const all = await getAllProjects();
  return all.slice(0, limit);
}

/** Slugs para getStaticPaths — junta CMS e locais, sem duplicados. */
export async function getAllProjectSlugs(): Promise<string[]> {
  const remote = await safeFetch<{ slug: string }[]>(ALL_SLUGS_QUERY, {}, []);
  const remoteSlugs = remote.map((s) => s.slug).filter(Boolean);
  const localSlugs = LOCAL_PROJECTS.map((p) => p.slug);
  return Array.from(new Set([...remoteSlugs, ...localSlugs]));
}

/** Um projeto por slug — procura primeiro no CMS, depois nos locais. */
export async function getProjectBySlug(
  slug: string,
  renderBody: (blocks: unknown) => string
): Promise<ProjectView | null> {
  const remote = await safeFetch<Project | null>(PROJECT_BY_SLUG_QUERY, { slug }, null);
  if (remote) return fromSanity(remote, renderBody(remote.caseStudy));

  const local = LOCAL_PROJECTS.find((p) => p.slug === slug);
  return local ? fromLocal(local) : null;
}

/** Categorias presentes numa lista, já com rótulo legível. */
export function categoriesOf(projects: ProjectView[]) {
  return Array.from(new Set(projects.flatMap((p) => p.category ?? []))).map((value) => ({
    value,
    label: CATEGORY_LABELS[value] ?? value,
  }));
}
