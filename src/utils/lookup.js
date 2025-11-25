/**
 * Lookup Module
 * Handles the lookups of all data that is needed from other arrays, based on the main array
 */

/**
 * Factory Function to find all genre titles from a given ID
 * @param {Array} allGenres - Array of all genres
 * @returns {Object} getGenreTitlesByIds - Method to find all genre titles based on their ID
 */
export function createGenreLookup(allGenres) {
  /**
   * Finds genre titles based on given IDs, loops through an array of ids and finds the matching genre title
   * @param {Array} ids - Array of genre IDs
   * @returns {Array} titles - Array of all found genre titles
   */
  function getGenreTitlesByIds(ids) {
    if (!Array.isArray(ids)) return [];
    return ids.map((id) => {
      const genre = allGenres.find((genre) => genre.id === id);
      return genre ? genre.title : "unknown";
    });
  }

  return { getGenreTitlesByIds };
}
