import React from "react";
import { PaginatateProps } from "./interface";


const Pagination: React.FC<PaginatateProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [24, 48, 72, 96],
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      // Show all pages when total pages are 5 or less
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <li key={number} className={`cursor-pointer ${currentPage === number ? "font-bold" : ""}`}>
          <button type="button" onClick={() => handlePageChange(number)}>
            {number}
          </button>
        </li>
      ));
    } else {
      // Dynamic pagination when total pages > 5
      const pages = [];

      if (currentPage <= 3) {
        // Case: Show first 3 pages
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= 4 && currentPage < totalPages - 1) {
        // Case: Show (currentPage - 2, currentPage - 1, currentPage, ..., last page)
        pages.push(currentPage - 2, currentPage - 1, currentPage, "...", totalPages);
      } else {
        // Case: Current page is at the last two positions
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      }

      return pages.map((number, index) =>
        number === "..." ? (
          <li key={number}>...</li>
        ) : (
          <li key={number} className={`cursor-pointer ${currentPage === number ? "font-bold" : ""}`}>
            <button type="button" onClick={() => handlePageChange(number as number)}>
              {number}
            </button>
          </li>
        )
      );
    }
  };

  return (
    <div className="text-center">
      {/* Pagination Controls */}
      <ul className="inline-flex gap-x-3 text-grey-900 mb-1.5">
        {/* Previous Button */}
        <li className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
          <button type="button" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            &lt; Previous
          </button>
        </li>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <li className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}>
          <button type="button" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Next &gt;
          </button>
        </li>
      </ul>

      {/* Items Per Page */}
      <p>
        Show{" "}
        {itemsPerPageOptions.map((option, index) => (
          <button
            type="button"
            key={option}
            className={`cursor-pointer mx-1 ${itemsPerPage === option ? "font-bold" : ""}`}
            onClick={() => onItemsPerPageChange(option)}
          >
            {option}
            {index !== itemsPerPageOptions.length - 1 && " / "}
          </button>
        ))}{" "}
        per page
      </p>
    </div>
  );
};

export default Pagination;
