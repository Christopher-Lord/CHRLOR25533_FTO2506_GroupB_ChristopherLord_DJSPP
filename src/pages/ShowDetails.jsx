import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePodcast } from "../api/fetchData.jsx";
import Loading from "../components/UI/Loading.jsx";
import Error from "../components/UI/Error.jsx";
import PodcastDetails from "../components/Podcasts/PodcastDetails.jsx";

/**
 * ShowDetails Component
 *
 * This component:
 *  - Creates podcast, loading and error states
 *  - Sets useParams for id
 *  - Fetches all information for a single podcast, based on ID
 *  - Sets styling for "main" element when loading and error states are active
 *  - Renders loading and error states, and PodcastDetails UI
 *
 * @returns {JSX.Element} Show details page UI
 */
export default function ShowDetails() {
  const { id } = useParams();

  // States
  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching podcast information on mount
  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, []);

  // Changing styling on main element when loading and error states change
  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    if (loading || error) {
      mainElement.style.height = "100vh";
    } else {
      mainElement.style.height = "";
    }
  }, [loading, error]);

  return (
    <>
      {loading && <Loading message="Loading Podcast ⚙️" />}

      {error && (
        <Error message={`Error occurred while fetching podcast: ${error}`} />
      )}

      {!loading && !error && <PodcastDetails podcast={podcast} />}
    </>
  );
}
