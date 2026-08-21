import type { PortableTextBlock } from "@portabletext/types";

export type ProjectCategory =
  | "web-app"
  | "fintech-trading"
  | "automacao"
  | "landing-page"
  | "outro";

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Project {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  summary: string; // resumo curto p/ card do grid
  category: ProjectCategory[];
  techStack: string[]; // ex: ["Astro", "TypeScript", "Sanity"]
  coverImage: SanityImageAsset;
  gallery?: SanityImageAsset[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean; // exibir na Home
  caseStudy?: PortableTextBlock[]; // rich text: problema → solução → resultado
  client?: string; // nome do cliente (opcional, pode ser confidencial)
  publishedAt: string;
}
