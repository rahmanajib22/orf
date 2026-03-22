/**
 * Normalizes Arabic text for easier search.
 * Converts Alef variants to plain Alef, Taa Marbuta to Heh, etc.
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u0652]/g, '') // Remove Harakat (Tashkeel)
    .trim()
    .toLowerCase();
}
