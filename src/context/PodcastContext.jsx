import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useFetch } from "../hooks/useFetch.jsx";
import { createGenreLookup } from "../utils/lookup.js";
import { useGenres } from "../hooks/useGenres.jsx";
import Loading from "../components/UI/Loading.jsx";
import Error from "../components/UI/Error.jsx";

const API_KEY = "https://podcast-api.netlify.app/";

/**
 * Creating React context used to share states across components
 */
const PodcastContext = createContext();

/**
 * Custom hook for accessing the Podcast Context
 *
 * @returns {PodcastContext} The current podcast context values
 */
export function usePodcasts() {
  return useContext(PodcastContext);
}

/**
 * Provider Component: Wraps any part of the app that needs access to podcast data, filters, sorting etc.
 *
 * @param {Object} props - props.children - Components that should receive context data
 * @returns {JSX.Element} A PodcastContext provider containing all shared states.
 */
export function PodcastProvider({ children }) {
  // Using the custom hook to fetch data, along with loading and error states
  const {
    data,
    isLoading: podcastLoading,
    error: podcastError,
  } = useFetch(API_KEY);

  const { genres, isLoading: genresLoading, error: genresError } = useGenres();

  //UI states for filtering, searching and sorting
  const [selectedGenre, setSelectedGenre] = useState("all-genres");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const genreLookup = createGenreLookup(genres);

  //Mapping API podcasts to include genre titles
  const rawPodcasts = useMemo(() => {
    return (data || []).map((podcast) => ({
      ...podcast,
      genres: genreLookup.getGenreTitlesByIds(podcast.genres),
    }));
  }, [data, genreLookup]);

  //Memoized filtering and sorting logic
  const filteredPodcasts = useMemo(() => {
    let pods = [...rawPodcasts];

    // Apply genre filter if a specific genre has been selected
    if (selectedGenre !== "all-genres") {
      pods = pods.filter((pod) => pod.genres.includes(selectedGenre));
    }

    //Filtering by search term
    if (searchTerm.trim() !== "") {
      pods = pods.filter((pod) =>
        pod.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
    }

    //Filtering by sorting options
    if (sortOption === "newest") {
      pods.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortOption === "az") {
      pods.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "za") {
      pods.sort((a, b) => b.title.localeCompare(a.title));
    }

    return pods;

    //Update if these values change
  }, [rawPodcasts, selectedGenre, searchTerm, sortOption]);

  // Changing styling on main element when loading and error states change
  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    if (podcastLoading || genresLoading || podcastError || genresError) {
      mainElement.style.height = "100vh";
    } else {
      mainElement.style.height = "";
    }
  }, [podcastLoading, genresLoading, podcastError, genresError]);

  return (
    // Supplies the context values to the children
    // React components inside {children} can now call usePodcasts()
    <PodcastContext.Provider
      value={{
        isLoading: podcastLoading || genresLoading,
        error: podcastError || genresError,
        genres,
        selectedGenre,
        setSelectedGenre,
        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
        rawPodcasts,
        podcasts: filteredPodcasts,
      }}
    >
      {podcastLoading || genresLoading ? (
        <Loading message="Loading Podcasts ⚙️" />
      ) : podcastError || genresError ? (
        <Error message={`⚠️ Error: ${podcastError || genresError}`} />
      ) : (
        children
      )}
    </PodcastContext.Provider>
  );
}
