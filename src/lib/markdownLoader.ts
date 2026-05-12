/**
 * Utility to load markdown content dynamically based on slug
 */

/**
 * Replaces {PLACEHOLDER} tokens using JSON data first, then VITE_ env vars.
 */
function interpolate(
  content: string,
  data: Record<string, unknown> = {}
): string {
  return content.replace(/\{([A-Z0-9_]+)\}/g, (match, key) => {
    if (key in data) return String(data[key]);
    const value = import.meta.env[`VITE_${key}`];
    return value !== undefined ? String(value) : match;
  });
}

export interface MarkdownContent {
  content: string;
  title?: string;
  description?: string;
  data?: Record<string, unknown>;
}

/**
 * Loads markdown content from the appropriate content directory.
 *
 * Filipino mode (any i18nextLng starting with "fil"):
 *  1. Try `{slug}-fil.md`
 *  2. Fallback to `{slug}.md` (English) if Filipino version is missing
 *
 * Also attempts to load a companion JSON file (same slug) for template
 * variable substitution and structured data.
 *
 * @param documentSlug - The document slug (filename without .md extension)
 * @param categorySlug - The category slug (parent directory)
 * @param categoryType - Whether this is a 'service' or 'government' document
 */
export async function loadMarkdownContent(
  documentSlug: string,
  categorySlug: string,
  categoryType: 'service' | 'government'
): Promise<MarkdownContent> {
  try {
    const dir = categoryType === 'government' ? 'government' : 'services';

    // Detect language preference (set by i18next)
    const lang =
      typeof window !== 'undefined'
        ? (localStorage.getItem('i18nextLng') ?? 'en')
        : 'en';
    const isFilipino = lang.toLowerCase().startsWith('fil');

    // Try to load companion JSON for template data
    let data: Record<string, unknown> = {};
    try {
      const jsonModule = await import(
        `../../content/${dir}/${categorySlug}/${documentSlug}.json`
      );
      data = jsonModule.default;
    } catch {
      // No companion JSON — that's fine
    }

    // Try Filipino version first if user selected Filipino, else English
    let module: { default: string } | undefined;
    if (isFilipino) {
      try {
        module = await import(
          `../../content/${dir}/${categorySlug}/${documentSlug}-fil.md?raw`
        );
      } catch {
        // Fallback to English if Filipino translation missing
        module = undefined;
      }
    }

    if (!module) {
      module = await import(
        `../../content/${dir}/${categorySlug}/${documentSlug}.md?raw`
      );
    }

    if (!module) {
      throw new Error(`Content not found: ${documentSlug}`);
    }

    const content = interpolate(module.default, data);

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : undefined;

    const descriptionMatch = content.match(/^#\s+.+$\n\n(.+?)(?:\n\n|$)/s);
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/^>\s*/, '').trim()
      : undefined;

    return { content, title, description, data };
  } catch (error) {
    console.error(
      `Failed to load markdown content for document: ${documentSlug}`,
      error
    );
    throw new Error(`Document not found: ${documentSlug}`);
  }
}
