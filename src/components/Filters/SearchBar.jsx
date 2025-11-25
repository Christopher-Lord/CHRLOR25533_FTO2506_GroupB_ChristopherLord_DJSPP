import "./SearchBar.css";

/**
 * SearchBar component for filtering podcasts by title

 * @param {Object} props -
 *  - props.searchTerm - Current search term entered by the user
 *  - props.setSearchTerm - Setter function to update the search term
 * @returns {JSX.Element} Rendered Search bar component
 */
export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <section className="search-bar">
      <div className="search-wrapper">
        {/* Text input for search */}
        <input
          type="text"
          placeholder="Search podcasts"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {/* Clear icon only appears when there is text */}
        {searchTerm && (
          <span className="clear-icon" onClick={() => setSearchTerm("")}>
            ✖
          </span>
        )}
      </div>
    </section>
  );
}
