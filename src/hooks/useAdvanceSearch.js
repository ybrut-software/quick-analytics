import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * A reusable hook for searching, filtering, and paginating lists with Web Worker optimization for large datasets
 * @param {Array} data - The original array to filter
 * @param {Object} options - Configuration options
 * @param {string|Array<string>} options.searchFields - Field(s) to search in or 'all'
 * @param {number} options.itemsPerPage - Items per page (default: 10)
 * @param {boolean} options.caseSensitive - Case sensitive search (default: false)
 * @param {boolean} options.exactMatch - Exact match search (default: false)
 * @returns {Object} - Filtered data and utility functions
 */
export const useAdvanceSearch = (data = [], options = {}) => {
  const {
    searchFields = "all",
    itemsPerPage = 10,
    caseSensitive = false,
    exactMatch = false,
    workerThreshold = 2000,
  } = options;

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const workerRef = useRef(null);
  const USE_WORKER_THRESHOLD = workerThreshold;

  // Initialize Web Worker
  useEffect(() => {
    if (data.length > USE_WORKER_THRESHOLD) {
      const blob = new Blob([workerCode], { type: "application/javascript" });
      workerRef.current = new Worker(URL.createObjectURL(blob));

      workerRef.current.onmessage = (e) => {
        setFilteredData(e.data.filteredData);
        setTotalItems(e.data.totalItems);
      };

      return () => {
        workerRef.current.terminate();
        workerRef.current = null;
      };
    }
  }, [data.length]);

  // Main filtering logic
  const processData = useMemo(() => {
    if (data.length <= USE_WORKER_THRESHOLD || !workerRef.current) {
      // Synchronous processing for smaller datasets
      const getSearchableText = (item) => {
        if (typeof item === "string" || typeof item === "number")
          return String(item);
        if (typeof item === "object" && item !== null) {
          if (searchFields === "all") {
            return Object.values(item)
              .filter((val) => val !== null && val !== undefined)
              .join(" ");
          } else if (Array.isArray(searchFields)) {
            return searchFields
              .map((field) => item[field])
              .filter((val) => val !== null && val !== undefined)
              .join(" ");
          } else if (typeof searchFields === "string") {
            return String(item[searchFields] || "");
          }
        }
        return "";
      };

      const matchesSearch = (item, term) => {
        if (!(term || "")?.trim()) return true;
        const searchableText = getSearchableText(item);
        const searchText = caseSensitive
          ? searchableText
          : searchableText.toLowerCase();
        const searchQuery = caseSensitive ? term : term.toLowerCase();
        return exactMatch
          ? searchText === searchQuery
          : searchText.includes(searchQuery);
      };

      const matchesFilters = (item) => {
        if (Object.keys(filters).length === 0) return true;
        return Object.entries(filters).every(([key, value]) => {
          if (value === null || value === undefined || value === "")
            return true;
          const itemValue = item[key];
          if (Array.isArray(value)) return value.includes(itemValue);
          if (
            typeof value === "object" &&
            value.min !== undefined &&
            value.max !== undefined
          ) {
            return itemValue >= value.min && itemValue <= value.max;
          }
          return itemValue === value;
        });
      };

      let result = data
        .filter((item) => matchesSearch(item, searchTerm))
        .filter(matchesFilters);

      const startIndex = (currentPage - 1) * itemsPerPage;
      return {
        filteredData: result.slice(startIndex, startIndex + itemsPerPage),
        totalItems: result.length,
      };
    } else {
      // Web Worker processing
      workerRef.current.postMessage({
        data,
        searchTerm,
        searchFields,
        filters,
        page: currentPage,
        itemsPerPage,
        caseSensitive,
        exactMatch,
      });
      return { filteredData, totalItems };
    }
  }, [
    data,
    searchTerm,
    filters,
    currentPage,
    itemsPerPage,
    caseSensitive,
    exactMatch,
  ]);

  // Update state for non-worker processing
  useEffect(() => {
    if (data.length <= USE_WORKER_THRESHOLD || !workerRef.current) {
      setFilteredData(processData.filteredData);
      setTotalItems(processData.totalItems);
    }
  }, [processData, data.length]);

  // Utility functions
  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
  };

  const removeFilter = useCallback((key) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const getUniqueValues = (field) => {
    return [
      ...new Set(
        data
          .map((item) => item[field])
          .filter((val) => val !== null && val !== undefined)
      ),
    ];
  };

  // Pagination controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Statistics
  const stats = {
    total: data.length,
    filtered: totalItems,
    currentPageItems: filteredData.length,
    hasActiveFilters:
      Object.keys(filters).length > 0 || (searchTerm || "").trim() !== "",
  };

  return {
    // Data
    filteredData,

    // Search
    searchTerm,
    setSearchTerm,

    // Filters
    filters,
    setFilter,
    clearFilters,
    removeFilter,
    getUniqueValues,

    // Pagination
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    itemsPerPage,

    // Stats
    stats,

    // Convenience getters
    isEmpty: filteredData.length === 0,
    hasResults: filteredData.length > 0,
    isFiltered: stats.hasActiveFilters,
  };
};

// Web Worker code (as a string to create blob)
const workerCode = `
  self.onmessage = function(e) {
    const { data, searchTerm, searchFields, filters, page, itemsPerPage, caseSensitive, exactMatch } = e.data;

    // Helper to get searchable text
    const getSearchableText = (item) => {
      if (typeof item === 'string' || typeof item === 'number') return String(item);
      if (typeof item === 'object' && item !== null) {
        if (searchFields === 'all') {
          return Object.values(item)
            .filter(val => val !== null && val !== undefined)
            .join(' ');
        } else if (Array.isArray(searchFields)) {
          return searchFields
            .map(field => item[field])
            .filter(val => val !== null && val !== undefined)
            .join(' ');
        } else if (typeof searchFields === 'string') {
          return String(item[searchFields] || '');
        }
      }
      return '';
    };

    // Search matching
    const matchesSearch = (item, term) => {
      if (!term.trim()) return true;
      const searchableText = getSearchableText(item);
      const searchText = caseSensitive ? searchableText : searchableText.toLowerCase();
      const searchQuery = caseSensitive ? term : term.toLowerCase();
      return exactMatch ? searchText === searchQuery : searchText.includes(searchQuery);
    };

    // Filter matching
    const matchesFilters = (item, filters) => {
      if (Object.keys(filters).length === 0) return true;
      return Object.entries(filters).every(([key, value]) => {
        if (value === null || value === undefined || value === '') return true;
        const itemValue = item[key];
        if (Array.isArray(value)) return value.includes(itemValue);
        if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
          return itemValue >= value.min && itemValue <= value.max;
        }
        return itemValue === value;
      });
    };

    // Process data
    let result = data
      .filter(item => matchesSearch(item, searchTerm))
      .filter(item => matchesFilters(item, filters));

    // Apply pagination
    const totalItems = result.length;
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = result.slice(startIndex, startIndex + itemsPerPage);

    self.postMessage({ filteredData: paginatedData, totalItems });
  };
`;
