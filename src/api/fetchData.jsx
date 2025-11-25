/**
 * Function to fetch a single podcasts details based on the podcasts ID
 *
 * @param {Number} id - ID of the podcast being fetched
 * @param {Function} setPodcast - State setter for the podcast
 * @param {Function} setError - State setter for the error state
 * @param {Function} setLoading - State setter for the loading state
 */
export async function fetchSinglePodcast(id, setPodcast, setError, setLoading) {
  try {
    // Setting loading and error states
    setLoading(true);
    setError(null);

    // Fetching podcast details
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch podcast. Status: ${response.status}`);
    }

    const data = await response.json();

    // Setting podcasts details
    setPodcast(data);
  } catch (error) {
    setError(error.message || "Unknown error occurred");
  } finally {
    setLoading(false);
  }
}
