"use client";

import { findCases } from "@/api/cases";
import { Button } from "@/components/button";
import { ExportPdf } from "@/components/feeds/ExportPdfButton";
import { Heading, Subheading } from "@/components/heading";
import Pagination from "@/components/pagination/Pagination";
import AdvancedSearchBar from "@/components/search/AdvancedSearchBar";
import Spinner from "@/components/spinner";
import { DynamicTable } from "@/components/table/DynamicTable";
import { useAdvanceSearch } from "@/hooks/useAdvanceSearch";
import { snakeCaseToText } from "@/utils/caseConvertUtils";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImportFeedDialog } from "../feed/page";

export default function FeedsPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const casesQuery = useQuery({
    queryKey: ["cases"],
    queryFn: findCases,
  });

  const casesData = casesQuery?.data || [];

  const {
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

    // Pagination
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    itemsPerPage,

    // Stats
    stats,
  } = useAdvanceSearch(casesData, {
    itemsPerPage: 15,
  });

  const CASES_OPTIONS = [...new Set(casesData?.map((i) => i.case))]
    .filter((i) => i)
    .map((v) => ({
      value: v,
      label: snakeCaseToText(v),
    }));

  const UNIT_OPTIONS = [...new Set(casesData?.map((i) => i.unit))]
    .filter((i) => i)
    .map((v) => ({
      value: v,
      label: snakeCaseToText(v),
    }));

  // SearchBar configuration
  const searchConfig = {
    search: true,
    fields: {
      case: CASES_OPTIONS,
      unit: UNIT_OPTIONS,
    },
  };

  if (casesQuery.isFetching)
    return (
      <div className="min-h-screen text-center py-12">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-between">
          <Heading>Feeds</Heading>
          <div className="flex gap-3">
            <Button type="button" onClick={() => setIsOpen(true)}>
              + Add Feeds
            </Button>
            <ExportPdf data={filteredData} />
            <ExportPdf name="Export All" data={casesData} />
          </div>
        </div>
        <div className="mt-5">
          <Subheading>Case Entry List</Subheading>
          <AdvancedSearchBar
            config={searchConfig}
            setSearchTerm={setSearchTerm}
            setFilter={setFilter}
            clearFilters={clearFilters}
            removeFilter={removeFilter}
            searchTerm={searchTerm}
            filters={filters}
          />

          <DynamicTable data={filteredData} isLoading={casesQuery.isFetching} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            nextPage={nextPage}
            prevPage={prevPage}
            itemsPerPage={itemsPerPage}
            totalItems={stats.filtered}
            currentPageItems={stats.currentPageItems}
          />
        </div>
      </div>

      {/* add feeds modal */}
      <ImportFeedDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          setIsOpen(false);
          casesQuery.refetch();
        }}
      />
    </>
  );
}
