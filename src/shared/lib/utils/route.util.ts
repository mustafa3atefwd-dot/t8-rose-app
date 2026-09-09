/**
 * Creates a URL-friendly slug from a string.
 * 
 * @param value The string to convert to a slug.
 * @returns The slug.
 */
export function createSlug(value: string): string {
  return encodeURIComponent(value.trim().toLowerCase().replace(/\s+/g, '-'));
}

/**
 * Creates a dashboard entity edit path.
 * 
 * @param resource The resource.
 * @param id The ID.
 * @param name The name.
 * @returns The dashboard entity edit path.
 */
export function createDashboardEntityEditPath({
  resource,
  id,
  name,
}: {
  resource: 'categories' | 'occasions' | 'products';
  id: string | number;
  name: string;
}) {
  return `/dashboard/${resource}/${id}/${createSlug(name)}/edit`;
}

/**
 * Converts a slug to a human-readable label.
 * 
 * @param slug The slug to convert.
 * @returns The label.
 */
export function slugToLabel(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
