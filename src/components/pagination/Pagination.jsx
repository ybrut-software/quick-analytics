import PropTypes from "prop-types";

/**
 * Pagination component for navigating through paginated data with page information
 * @param {Object} props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.goToPage - Function to navigate to a specific page
 * @param {Function} props.nextPage - Function to go to the next page
 * @param {Function} props.prevPage - Function to go to the previous page
 * @param {number} props.itemsPerPage - Number of items per page
 * @param {number} props.totalItems - Total number of filtered items
 * @param {number} props.currentPageItems - Number of items on the current page
 * @param {number} [props.maxVisiblePages=5] - Maximum number of page buttons to show
 * @returns {JSX.Element}
 */
const Pagination = ({
  currentPage,
  totalPages,
  goToPage,
  nextPage,
  prevPage,
  itemsPerPage,
  totalItems,
  currentPageItems,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1 && totalItems === 0) return null;

  // Calculate the range of page numbers to display
  const getPageRange = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if end is at totalPages
    if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Calculate item range for display (e.g., "Showing 1-5 of 100")
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = startItem + currentPageItems - 1;

  const pageRange = getPageRange();

  return (
    <div>
      {/* Page Information (Empty div for spacing) */}
      <div className="w-full mt-5">
        <div className="text-center text-gray-500">
          {totalItems > 0 ? (
            <span>
              Showing {startItem}-{endItem} of {totalItems} items (Page{" "}
              {currentPage} of {totalPages})
            </span>
          ) : (
            <span>No items to display</span>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <ul className="flex justify-center items-center mt-5">
          {/* Previous Button */}
          <li>
            <button
              className={`px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={prevPage}
              disabled={currentPage === 1}
              aria-label="Previous"
            >
              <span aria-hidden="true">«</span>
            </button>
          </li>

          {/* First Page */}
          {pageRange[0] > 1 && (
            <>
              <li>
                <button
                  className="px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                  onClick={() => goToPage(1)}
                  aria-label="Page 1"
                >
                  1
                </button>
              </li>
              {pageRange[0] > 2 && (
                <li>
                  <span className="px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 cursor-default">
                    ...
                  </span>
                </li>
              )}
            </>
          )}

          {/* Page Numbers */}
          {pageRange.map((page) => (
            <li key={page}>
              <button
                className={`px-3 py-2 text-sm leading-tight border border-gray-300 cursor-pointer ${
                  currentPage === page
                    ? "text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                }`}
                onClick={() => goToPage(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Last Page */}
          {pageRange[pageRange.length - 1] < totalPages && (
            <>
              {pageRange[pageRange.length - 1] < totalPages - 1 && (
                <li>
                  <span className="px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 cursor-default">
                    ...
                  </span>
                </li>
              )}
              <li>
                <button
                  className="px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                  onClick={() => goToPage(totalPages)}
                  aria-label={`Page ${totalPages}`}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          {/* Next Button */}
          <li>
            <button
              className={`px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={nextPage}
              disabled={currentPage === totalPages}
              aria-label="Next"
            >
              <span aria-hidden="true">»</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPageItems: PropTypes.number.isRequired,
  maxVisiblePages: PropTypes.number,
};

Pagination.defaultProps = {
  maxVisiblePages: 5,
};

export default Pagination;
