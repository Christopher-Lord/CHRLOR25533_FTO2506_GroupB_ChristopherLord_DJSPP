import { useEffect, useState } from "react";

const GENRE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Hook to fetch all genres based on their ID and assign them to their own array for use elsewhere
 *
 * @returns {Object} genres, isLoading and error state variables
 */
export function useGenres() {
  // States
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGenres() {
      try {
        setIsLoading(true);

        // Waiting for all promises to complete before moving on
        const results = await Promise.all(
          // Mapping all genre information to a new array
          GENRE_IDS.map((id) =>
            fetch(`https://podcast-api.netlify.app/genre/${id}`).then(
              (response) => {
                if (!response.ok) throw new Error(`Genre ${id} not found`);
                return response.json();
              },
            ),
          ),
        );

        // Setting genre state
        setGenres(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadGenres();
  }, []);

  return { genres, isLoading, error };
}
