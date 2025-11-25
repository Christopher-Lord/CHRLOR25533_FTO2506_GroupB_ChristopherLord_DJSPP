import "./Filter.css";

/**
 * SortFilter component to allow for selecting a sorting option for podcasts
 *
 * @param {Object} props -
 *  - props.sortOption - The currently selected sort option
 *  - props.setSortOption - Setter function to update the sort option
 * @returns {JSX.Element} Rendered select dropdown for sorting
 */
export default function SortFilter({ sortOption, setSortOption }) {
  return (
    <>
      <select
        name="filter-select"
        id="filter-updated"
        value={sortOption}
        onChange={(event) => setSortOption(event.target.value)}
      >
        <option value="default">Default</option>
        <option value="newest">Most Recent</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </>
  );
}
