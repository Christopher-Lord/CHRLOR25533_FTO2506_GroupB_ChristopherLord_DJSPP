import { usePagination } from "../hooks/usePagination.jsx";
import { usePodcasts } from "../context/PodcastContext.jsx";
import SearchBar from "../components/Filters/SearchBar.jsx";
import PodcastGrid from "../components/Podcasts/PodcastGrid.jsx";
import GenreFilter from "../components/Filters/GenreFilter.jsx";
import SortFilter from "../components/Filters/SortFilter.jsx";
import PodcastCarousel from "../components/Podcasts/PodcastCarousel.jsx";

/**
 * Home page component
 *
 * This component:
 * - Retrieves podcast data and UI state from PodcastContext
 * - Applies pagination using the usePagination hook
 * - Renders search, filters and paginated podcast grid
 *
 * @returns {JSX.Element} Home page UI
 */
export default function Home() {
  // Access shared podcast state and actions from PodcastContext
  const {
    podcasts,
    genres,
    selectedGenre,
    setSelectedGenre,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
  } = usePodcasts();

  // Call pagination hook to be used in the component
  const {
    paginatedData: visiblePodcasts,
    loadMore,
    currentPage,
    totalPages,
  } = usePagination(podcasts, 12);

  return (
    <>
      {/* Search bar and filters section */}
      <div className="filter-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="filter">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />

          <SortFilter sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>

      <PodcastCarousel numberOfItems={12} />
      
      {/* PodcastGrid component: Displays the podcast cards in a responsive grid layout */}
      <PodcastGrid podcasts={visiblePodcasts} />

      {/* Pagination controls */}
      <div className="load-more">
        {currentPage < totalPages && (
          <button className="load-more-btn" onClick={loadMore}>
            Load More
          </button>
        )}

        {/* Info text showing count of displayed items */}
        <p className="page-info">
          Showing {visiblePodcasts.length} of {podcasts.length} podcasts
        </p>
      </div>
    </>
  );
}
