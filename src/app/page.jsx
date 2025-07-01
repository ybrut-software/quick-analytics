"use client";

import { findCasesSummary } from "@/api/cases";
import { Stat } from "@/app/stat";
import { Heading } from "@/components/heading";
import Spinner from "@/components/spinner";
import {
  CaseCountPieChart,
  ViolationCasesBarChart,
  ViolationCasesLineChart,
} from "@/components/ui/Charts";
import { snakeToWords } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const StatQuery = useQuery({
    queryKey: ["cases", "summary"],
    queryFn: () => findCasesSummary(),
  });

  const statsData = StatQuery?.data?.data;

  if (StatQuery.isFetching)
    return (
      <div className="min-h-screen text-center py-12">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto min-h-screen">
        <Heading>Dashboard</Heading>
        <div className="mt-5 grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div>
            <ViolationCasesBarChart caseData={statsData?.cases} />
            <ViolationCasesLineChart caseData={statsData?.cases} />
          </div>
          <div>
            <CaseCountPieChart caseData={statsData?.cases} />
          </div>
        </div>

        <div className="mt-5">
          <Heading> Cases Overview</Heading>
          <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
