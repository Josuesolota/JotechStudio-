import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Resumo curto",
      description: "Aparece no card do grid de projetos. Máx. 160 caracteres.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "category",
      title: "Categoria(s)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Web App", value: "web-app" },
          { title: "Fintech / Trading Systems", value: "fintech-trading" },
          { title: "Automação", value: "automacao" },
          { title: "Landing Page", value: "landing-page" },
          { title: "Outro", value: "outro" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "techStack",
      title: "Stack técnica",
      description: "Ex: Astro, TypeScript, Sanity, Deriv API",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo (SEO)", type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeria de imagens",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "demoUrl",
      title: "Link da demo",
      type: "url",
    }),
    defineField({
      name: "repoUrl",
      title: "Link do repositório",
      type: "url",
    }),
    defineField({
      name: "client",
      title: "Cliente",
      description: "Deixe em branco se for confidencial ou projeto pessoal",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Destaque na Home?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "caseStudy",
      title: "Case Study (rich text)",
      description: "Estruture como: Problema → Solução → Resultado",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "summary" },
  },
});
