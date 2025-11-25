import { useState, useEffect } from "react";

/**
 * 
 * @param {Array} data - The full dataset to paginate 
 * @param {number} itemsPerPage - Number of items to show per page
 * @returns {Object} Pagination state and helper functions
 */
export function usePagination(data, itemsPerPage) {
  // Current page number state
  const [currentPage, setCurrentPage] = useState(1);

  // Total number of pages calculated from data length
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const start = 0;
  const end = currentPage * itemsPerPage;

  // Slice the data to only show podcasts equal to currentPage * itemsPerPage
  const paginatedData = data.slice(start, end);

  /**
   * Function to increment the page number to show more items
   * Does nothing if already on the last page
   */
  function loadMore() {
    if (currentPage < totalPages) setCurrentPage((current) => current + 1);
  }

  /**
   * Function to reset the pagination to the first page
   */
  function resetPagination() {
    setCurrentPage(1);
  }

  // Whenever the data changes (e.g. search or filter applied), reset to page 1
  useEffect(() => {
    resetPagination();
  }, [data]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    loadMore,
    resetPagination,
  };
}
