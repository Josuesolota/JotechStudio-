import { toHTML } from "@portabletext/to-html";
import { urlFor } from "./sanity";
import type { PortableTextBlock } from "@portabletext/types";

/**
 * Converte o campo `caseStudy` (Portable Text) em HTML seguro para
 * renderizar com `set:html` nas páginas Astro.
 */
export function renderCaseStudy(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks || blocks.length === 0) return "";

  return toHTML(blocks, {
    components: {
      types: {
        image: ({ value }) =>
          `<img src="${urlFor(value).width(1200).url()}" alt="${value.alt ?? ""}" loading="lazy" />`,
      },
    },
  });
}
