import "./Filter.css";

/**
 *
 * @param {Object} genres - An array of available genres objects to filter by
 * Each genre object should include at least:
 *  - id - A unique ID for the genre
 *  - title - The display name of the genre
 * @param {string} selectedGenre - The currently selected genre value
 * @param {Function} setSelectedGenre - Function to update the selected genre state
 * @returns {JSX.Element} - A section containing dropdown filters for genre and sorting options
 */
export default function GenreFilter({
  genres,
  selectedGenre,
  setSelectedGenre,
}) {
  return (
    <>
      {/* Dropdown menu for selecting a podcast genre
          The selected value is controlled by the "selectedGenre" state
          Updated with "setSelectedGenre" function when the user changes their selection */}
      <select
        id="filter-genres"
        value={selectedGenre}
        onChange={(event) => setSelectedGenre(event.target.value)}
      >
        <option value="all-genres">All Genres</option>
        {/* Dynamically generate a dropdown option for each genre in the genres array */}
        {genres.map((genre) => (
          <option key={genre.id} value={genre.title}>
            {genre.title}
          </option>
        ))}
      </select>
    </>
  );
}
