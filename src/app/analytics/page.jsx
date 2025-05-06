"use client";

import { findCases, findCasesGrouped, findCasesSummary } from "@/api/cases";
import { Field, Label } from "@/components/fieldset";
import { Heading, Subheading } from "@/components/heading";
import { Select } from "@/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { CaseCountPieChart, CasePieChart } from "@/components/ui/Charts";
import { snakeToWords } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UNIT_FIELDS } from "../feed/page";
import { Stat } from "../stat";
import Spinner from "@/components/spinner";
import { Divider } from "@/components/divider";

export default function AnalyticsPage() {
  const [filter, setFilter] = useState({
    field: "all",
    unit: UNIT_FIELDS[0].value,
    case: "",
  });

  const handleSelectFilter = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const casesQuery = useQuery({
    queryKey: ["cases"],
    queryFn: findCases,
  });

  const casesData = casesQuery?.data || [];
  const filteredCases =
    casesData?.filter((i) => i.unit === filter.unit) || casesData;

  const groupQuery = useQuery({
    queryKey: ["cases", "filter", filter],
    queryFn: () =>
      findCasesGrouped({
        field: "",
      }),
  });

  const StatQuery = useQuery({
    queryKey: ["cases", "summary"],
    queryFn: () => findCasesSummary(),
  });

  const statsData = StatQuery?.data?.data;

  if (groupQuery.isLoading)
    return (
      <div className="min-h-screen text-center py-12">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <Heading>Analytics</Heading>

      <div className="my-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
        <Field>
          <Label>NAME OF EST / UNIT / BRS</Label>
          <Select name="unit" value={filter.unit} onChange={handleSelectFilter}>
            {UNIT_FIELDS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="mt-5 grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
        <div>
          <CaseCountPieChart caseData={statsData?.cases} />
        </div>
        <div>
          <CasePieChart data={statsData?.units} unit={filter.unit} />
        </div>
      </div>

      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
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

      {/* table data */}
      <Subheading>Detailed List</Subheading>
      <CasesTable isLoading={casesQuery.isLoading} data={filteredCases} />
    </div>
  );
}

export const CasesTable = ({ data, isLoading }) => {
  const tableConfig = {
    columns: ["unit", "date", "case", "value", "Person Name", "remark"],
    data: data,
  };

  if (isLoading) return <div className="my-12 text-center">Loading..</div>;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {tableConfig.columns?.map((col) => (
              <TableHeader key={`table-head-${col}`} className="capitalize">
                {col}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableConfig.data?.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item.unit}</TableCell>
              <TableCell className="font-medium">{item.date}</TableCell>
              <TableCell className="font-medium capitalize">
                {snakeToWords(item.case)}
              </TableCell>
              <TableCell>{item.value || "-"}</TableCell>
              <TableCell>{item.note || "-"}</TableCell>
              <TableCell className="text-zinc-500">
                {item.remark || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const CASE_FIELDS = [
  { label: "No of PIO Calls recd and Details", value: "30" },
  {
    label: "Contact with foreign Nationals",
    value: "10",
  },
  { label: "Espionage Cases", value: "76" },
  { label: "Social Media Violations", value: "45" },
  { label: "Chain Marketing", value: "34" },
  { label: "Fake Recruitment", value: "34" },
  { label: "Financial Frauds", value: "34" },
  { label: "Cheating Cases", value: "87" },
  { label: "Robbery Cases", value: "35" },
  { label: "Mutiny", value: "23" },
  { label: "Loss of Iden/ Docus", value: "0" },
  { label: "No of BOO conducted", value: "14" },
];
