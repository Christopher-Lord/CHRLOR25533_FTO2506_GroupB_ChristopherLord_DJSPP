import { usePodcasts } from "../../context/PodcastContext";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./PodcastCard.css";
import "./PodcastCarousel.css";

export default function PodcastCarousel({ numberOfItems }) {
  const { podcasts, isLoading, error } = usePodcasts();

  const [shuffled, setShuffled] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (podcasts.length === 0) return;

    const shuffledPodcasts = [...podcasts].sort(() => Math.random() - 0.5);
    setShuffled(shuffledPodcasts);
  }, [podcasts]);

  if (isLoading) return;
  if (error) return;

  const randomSelection = shuffled.slice(0, numberOfItems);

  const gap = 16;

  function scrollLeft() {
    const item = containerRef.current;
    if (!item) return;
    item.scrollBy({
      left: -250 + gap,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    const item = containerRef.current;
    if (!item) return;

    const maxScroll = item.scrollWidth - item.clientWidth;

    if (item.scrollLeft >= maxScroll - 2) {
      item.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      item.scrollBy({
        left: 250 + gap,
        behavior: "smooth",
      });
    }
  }

  // useEffect(() => {
  //   const item = containerRef.current;
  //   function handleScroll() {
  //     if (item.scrollLeft + item.clientWidth >= item.scrollWidth - 2) {
  //       item.scrollTo({ left: 0 });
  //     }
  //   }

  //   item.onscroll = handleScroll;
  //   return () => (item.onscroll = null);
  // }, []);

  return (
    <>
      <div className="carousel-container">
        <h2 className="recommended">Recommended</h2>
        <button className="carousel-arrow left" onClick={scrollLeft}>
          &#10094;
        </button>
        <div className="carousel-content" ref={containerRef}>
          {randomSelection.map((pod) => (
            <Link to={`/show/${pod.id}`} className="link" key={pod.id}>
              <div className="carousel-item">
                <img
                  src={pod.image}
                  alt={pod.title}
                  className="preview-cover-img"
                />

                <h2>{pod.title}</h2>

                <p className="podcast-seasons">{pod.seasons} seasons</p>

                <ul className="podcast-genres">
                  {/* Loop through the array of genres and render each one as a list item */}
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
