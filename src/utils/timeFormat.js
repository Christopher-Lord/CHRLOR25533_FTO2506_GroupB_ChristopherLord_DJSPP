/**
 * Convert a time in seconds to a human-readable "minutes:seconds" format.
 *
 * @param {number} totalSeconds - The total time in seconds.
 * @returns {string} Formatted time as "M:SS".
 */
export function timeFormat(totalSeconds) {
  // Return default if no valid input
  if (!totalSeconds) return "0:00";

  // Calculate minutes
  const minutes = Math.floor(totalSeconds / 60);

  // Calculate remaining seconds and pad to 2 digits
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  // Combine minutes and seconds
  return `${minutes}:${seconds}`;
}
