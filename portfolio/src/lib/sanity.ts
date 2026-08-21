import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "@sanity/types";

/**
 * Cliente Sanity — usado em build-time pelas páginas Astro (SSG).
 * As credenciais vêm de variáveis de ambiente (.env), nunca hardcoded.
 */
// Se SANITY_PROJECT_ID não estiver definido (.env ausente ou incompleto),
// usamos um placeholder para que a CRIAÇÃO do client nunca quebre o build.
// As buscas (fetch) então falharão de forma controlada e serão capturadas
// por safeFetch() abaixo, em vez de derrubar o site inteiro.
if (!import.meta.env.SANITY_PROJECT_ID) {
  console.warn(
    "[sanity] SANITY_PROJECT_ID não definido — configure o arquivo .env (veja .env.example). " +
      "O site vai buildar normalmente, mas sem dados reais do CMS."
  );
}

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || "placeholder",
  dataset: import.meta.env.SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01", // trave a versão da API para evitar breaking changes
  useCdn: true, // true = respostas mais rápidas e em cache (ideal para build)
});

const builder = imageUrlBuilder(sanityClient);

/** Helper para gerar URLs otimizadas de imagens do Sanity */
export function urlFor(source: Image) {
  return builder.image(source);
}

/**
 * Busca "segura": se o Sanity ainda não tiver dados (ou o projectId
 * estiver mal configurado), o build não quebra — retorna um fallback
 * em vez de derrubar o site inteiro.
 */
export async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  try {
    const result = await sanityClient.fetch<T>(query, params);
    return result ?? fallback;
  } catch (error) {
    console.warn("[sanity] Falha ao buscar dados, usando fallback:", error);
    return fallback;
  }
}
