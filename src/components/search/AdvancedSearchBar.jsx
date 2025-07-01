import PropTypes from "prop-types";
import { useCallback } from "react";

import { Button } from "../button";
import { Input } from "../input";

import { camelCaseToText } from "@/utils/caseConvertUtils";
import { Field, Label } from "../fieldset";
import { Select } from "../select";

/**
 * AdvancedSearchBar component with configurable search, filter inputs, and applied filters as pills
 * @param {Object} props
 * @param {Function} props.setSearchTerm - Function to set search term
 * @param {Function} props.setFilter - Function to set filter
 * @param {Function} props.clearFilters - Function to clear all filters
 * @param {Function} props.removeFilter - Function to remove a specific filter
 * @param {string} props.searchTerm - Current search term
 * @param {Object} props.filters - Current applied filters
 * @param {Object} props.config - Configuration for search and filters
 * @param {boolean} props.config.search - Enable/disable search input
 * @param {Object} props.config.fields - Filter fields with dropdown options
 * @param {Function} [props.onInputSearch] - Optional callback for search input changes
 * @returns {JSX.Element}
 */
export const AdvancedSearchBar = ({
  setSearchTerm,
  setFilter,
  clearFilters,
  removeFilter,
  searchTerm,
  filters,
  config,
  onInputSearch,
}) => {
  const { search = true, fields = {} } = config;

  // Handle search input changes
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      if (onInputSearch) {
        onInputSearch(value);
      }
    },
    [setSearchTerm, onInputSearch]
  );

  // Handle filter selection
  const handleFilterChange = useCallback(
    (key, option) => {
      const value = option.value === "" ? null : option.value;
      setFilter(key, value);
      if (option.onSelect) {
        option.onSelect(value);
      }
    },
    [setFilter]
  );

  // Get display label for a filter value
  const getFilterLabel = (key, value) => {
    const options = fields[key] || [];
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : String(value);
  };

  const activeFilters = searchTerm || Object.keys(filters).length > 0;

  return (
    <div className="mb-3">
      {/* Search and Filter Inputs */}
      <div className="flex flex-wrap gap-2 items-end mt-5">
        {/* Search Input */}
        {search && (
          <div className="flex-1 md:flex-none md:w-1/3">
            <Field>
              <Label>Search</Label>
              <Input
                type="search"
                placeholder="Enter Search Value.."
                label="Search"
                onChange={handleSearchChange}
                value={searchTerm}
              />
            </Field>
          </div>
        )}

        {/* Filter Dropdowns */}
        {Object.entries(fields).map(([key, options]) => (
          <Field key={`filter-${key}`}>
            <Label>{camelCaseToText(key)}</Label>
            <Select
              id={`filter-${key}`}
              onChange={(e) => {
                const selectedOption = options.find(
                  (opt) => opt.value === e.target.value
                ) || { value: "" };
                handleFilterChange(key, selectedOption);
              }}
              aria-label={`Filter by ${key}`}
              value={filters[key] || ""}
            >
              <option key={`default-${key}`} value="">
                All
              </option>
              {options.map(({ value, label }) => (
                <option value={value}>{label}</option>
              ))}
            </Select>
          </Field>
        ))}

        {/* Clear Filters Button */}
        {activeFilters && (
          <div className="w-full sm:w-auto">
            <Button onClick={clearFilters} type="button">
              <span className="mr-2">Clear Filters</span>
            </Button>
          </div>
        )}
      </div>

      {/* Applied Filters Pills */}
      {activeFilters && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {/* Search Term Pill */}
            {searchTerm && (
              <Button
                onClick={() => setSearchTerm("")}
                outline
                className="inline-flex items-center px-3 py-1 rounded-full text-sm"
              >
                Search:{" "}
                <span className="text-red-500 ml-1">"{searchTerm}"</span>
                <span
                  className="flex items-center justify-center text-gray-500"
                  aria-label="Remove search term"
                >
                  <span>×</span>
                </span>
              </Button>
            )}

            {/* Filter Pills */}
            {Object.entries(filters).map(
              ([key, value]) =>
                value !== null &&
                value !== undefined && (
                  <Button
                    outline
                    key={key}
                    className="flex items-center px-3 py-1"
                    onClick={() => removeFilter(key)}
                  >
                    {camelCaseToText(key)}:
                    <span className="text-red-600 ml-1">
                      {getFilterLabel(key, value)}
                    </span>
                    <span
                      className="flex items-center justify-center text-gray-500"
                      aria-label="Remove search term"
                    >
                      <span>×</span>
                    </span>
                  </Button>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

AdvancedSearchBar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  config: PropTypes.shape({
    search: PropTypes.bool,
    fields: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          onSelect: PropTypes.func,
        })
      )
    ),
  }).isRequired,
  onInputSearch: PropTypes.func,
};

AdvancedSearchBar.defaultProps = {
  config: { search: true, fields: {} },
  onInputSearch: null,
};

export default AdvancedSearchBar;
