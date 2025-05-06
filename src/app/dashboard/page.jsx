"use client";

import { Heading, Subheading } from "@/components/heading";
import { useEffect } from "react";
import { Stat } from "@/app/stat";
import { CASE_FIELDS } from "../analytics/page";
import { snakeToWords } from "@/utils/utils";
import { findCasesSummary } from "@/api/cases";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const StatQuery = useQuery({
    queryKey: ["cases", "summary"],
    queryFn: () => findCasesSummary(),
  });

  const statsData = StatQuery?.data?.data;

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
      </div>
    </>
  );
}
