import PodcastCard from "./PodcastCard.jsx";
import "./PodcastCard.css";

/**
 * A React component that creates a grid of podcast cards
 *
 * @param {Object} podcasts - An array of podcast objects to display
 * @returns {JSX.ELement} A grid layout of podcast cards
 */
export default function PodcastGrid({ podcasts }) {
  return (
    <section className="podcast-cards">
      {/* Loop over the array of podcasts and render a PodcastCard for each one
          The "key" prop uses the podcasts unique ID to help React efficiently update the list */}
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </section>
  );
}
