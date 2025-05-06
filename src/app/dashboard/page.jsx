"use client";

import { findCases, findCasesSummary } from "@/api/cases";
import { Stat } from "@/app/stat";
import { Heading, Subheading } from "@/components/heading";
import { snakeToWords } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { CasesTable } from "../analytics/page";
import Spinner from "@/components/spinner";

export default function Home() {
  const StatQuery = useQuery({
    queryKey: ["cases", "summary"],
    queryFn: () => findCasesSummary(),
  });

  const casesQuery = useQuery({
    queryKey: ["cases"],
    queryFn: findCases,
  });

  const statsData = StatQuery?.data?.data;
  const casesData = casesQuery?.data || [];

  if (casesQuery.isFetching || StatQuery.isFetching)
    return (
      <div className="min-h-screen text-center py-12">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto min-h-screen">
        <Heading> Cases Overview</Heading>
        <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {Object.keys(statsData?.cases || {}).map((i) => {
            const value = statsData?.cases[i] || 0;
            return (
              <Stat
                key={`cases-stat-${i}`}
                title={snakeToWords(i)}
                value={value}
                change="0"
              />
            );
          })}
        </div>
        <Heading>Unit Wise Distribution</Heading>
        <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {Object.keys(statsData?.units || []).map((i) => {
            const value = statsData?.units[i]?.total || 0;
            return (
              <Stat
                key={`unit-stat-${i}`}
                title={snakeToWords(i)}
                value={value}
                change="0"
              />
            );
          })}
        </div>

        <div>
          <Subheading>Case Entry List</Subheading>
          <CasesTable data={casesData} isLoading={casesQuery.isFetching} />
        </div>
      </div>
    </>
  );
}
