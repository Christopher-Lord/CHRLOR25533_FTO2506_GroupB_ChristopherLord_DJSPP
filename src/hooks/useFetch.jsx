import { useState, useEffect } from "react";

/**
 * Custom React hook for fetching data from a given API
 *
 * @param {String} API_KEY
 * @returns {Object} An object containing:
 * - {any} data - The fetched data
 * - {boolean} isLoading - State to contain whether the data is currently loading or not
 * - {string} error - The error message if the request fails
 */
export function useFetch(API_KEY) {
  // States to hold the fetched data, see if it's currently being fetched and hold an error msg if it fails
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Returns if there is no API provided
    if (!API_KEY) return;

    /**
     * Async function to fetch data from a given API
     */
    async function fetchData() {
      try {
        // Sets loading state
        setIsLoading(true);
        const response = await fetch(API_KEY);

        // Throw an error if the response is not OK
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        // Parse JSON data from the response
        const json = await response.json();

        // Update state with fetched data
        setData(json);
      } catch (error) {
        // Update state if there is an error
        setError(error.message);
      } finally {
        // Setting loading state to false once data has been fetched or fails
        setIsLoading(false);
      }
    }

    // Call async function
    fetchData();

    // Re-run effect if API_KEY changes
  }, [API_KEY]);

  // Return the current data, loading and error states
  return { data, isLoading, error };
}
