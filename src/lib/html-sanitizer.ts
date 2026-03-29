import DOMPurify from "dompurify";

// Configure DOMPurify to allow safe HTML formatting tags
const ALLOWED_TAGS = ['b', 'i', 'u', 'strong', 'em', 'span', 'p', 'br', 'div', 'font'];
const ALLOWED_ATTR = ['style', 'color', 'align'];

/**
 * Sanitizes HTML content to prevent XSS attacks while preserving safe formatting tags.
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
}
