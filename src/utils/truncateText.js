/**
 * Simple function to truncate text to a certain character length
 *
 * @param {String} text - Text you want to truncate
 * @param {Number} maxChars - Maximum characters you want the text to have
 * @returns {String} Truncated text
 */
export function truncateText(text, maxChars) {
  if (!text) return;

  // If text length is greater than the max characters, slice it, otherwise just use the base text
  return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
}
