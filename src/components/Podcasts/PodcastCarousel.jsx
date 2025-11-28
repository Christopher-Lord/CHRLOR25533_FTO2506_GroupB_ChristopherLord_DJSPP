import { usePodcasts } from "../../context/PodcastContext";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./PodcastCard.css";
import "./PodcastCarousel.css";

/**
 * PodcastCarousel component displays a horizontally scrollable carousel of podcast cards
 *
 * @param {Object} props - Component props.
 * @param {number} props.numberOfItems - Number of podcasts to display in the carousel
 * @returns {JSX.Element} The carousel component.
 */
export default function PodcastCarousel({ numberOfItems }) {
  // Fetch raw podcasts, loading state, and any errors from the PodcastContext
  const { rawPodcasts, isLoading, error } = usePodcasts();

  // State to store a shuffled version of the podcasts
  const [shuffled, setShuffled] = useState([]);

  // Ref for the carousel container to control scrolling
  const containerRef = useRef(null);

  // Shuffle the podcasts whenever the data is loaded
  useEffect(() => {
    if (rawPodcasts.length === 0) return;

    // Shuffle the podcasts randomly
    const shuffledPodcasts = [...rawPodcasts].sort(() => Math.random() - 0.5);
    setShuffled(shuffledPodcasts);
  }, [isLoading]);

  if (isLoading) return null;
  if (error) return null;

  // Pick a random selection of podcasts based on the numberOfItems prop
  const randomSelection = shuffled.slice(0, numberOfItems);

  const gap = 16;

  /**
   * Scroll the carousel container to the left by a fixed amount.
   */
  function scrollLeft() {
    const item = containerRef.current;
    if (!item) return;
    item.scrollBy({
      left: -250 + gap,
      behavior: "smooth",
    });
  }

  /**
   * Scroll the carousel container to the right by a fixed amount.
   * If we reach the end, loop back to the start.
   */
  function scrollRight() {
    const item = containerRef.current;
    if (!item) return;

    const maxScroll = item.scrollWidth - item.clientWidth;

    if (item.scrollLeft >= maxScroll - 2) {
      // Loop back to start if at the end
      item.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      item.scrollBy({
        left: 250 + gap,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <div className="carousel-container">
        {/* Carousel title */}
        <h2 className="recommended">Recommended</h2>
        <button className="carousel-arrow left" onClick={scrollLeft}>
          &#10094;
        </button>
        {/* Carousel content */}
        <div className="carousel-content" ref={containerRef}>
          {/* Map the random selection to display each card */}
          {randomSelection.map((pod) => (
            <Link to={`/show/${pod.id}`} className="link" key={pod.id}>
              <div className="carousel-item">
                <img
                  src={pod.image}
                  alt={pod.title}
                  className="preview-cover-img"
                />

                <h2>{pod.title}</h2>

                {/* Number of seasons */}
                <p className="podcast-seasons">{pod.seasons} seasons</p>

                <ul className="podcast-genres">
                  {/* Podcast genres */}
                  {pod.genres.map((genre) => (
                    <li key={genre}>{genre}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </>
  );
}
