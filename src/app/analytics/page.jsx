"use client";

import { findCasesSummary } from "@/api/cases";
import { Button } from "@/components/button";
import { Field, Label } from "@/components/fieldset";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import Spinner from "@/components/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  CaseCountPieChart,
  CasePieChart,
  CasesAcrossUnitsBarChart,
  CasesForUnitBarChart,
  CasesForUnitLineChart,
} from "@/components/ui/Charts";
import { snakeToWords } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Stat } from "../stat";

const DEFAULT_UNIT = "unit-0";

export default function AnalyticsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState({
    field: "all",
    unit: DEFAULT_UNIT,
    case: "",
  });

  const handleSelectFilter = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const StatQuery = useQuery({
    queryKey: ["cases", "summary"],
    queryFn: () => findCasesSummary(),
  });

  const statsData = StatQuery?.data?.data;

  const getUnitOptions = () => {
    return Object.keys(statsData?.units).map((i) => ({
      value: i,
      label: i,
    }));
  };

  if (StatQuery.isLoading)
    return (
      <div className="min-h-screen text-center py-12">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <Heading>Analytics</Heading>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                router.push("/feeds");
              }}
            >
              View Feeds
            </Button>
          </div>
        </div>
        <div className="my-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
          <Field>
            <Label>NAME OF EST / UNIT / BRS</Label>
            <Select
              name="unit"
              value={filter.unit}
              onChange={handleSelectFilter}
            >
              {getUnitOptions().map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="mt-5 grid gap-8 sm:grid-cols-2 xl:grid-cols-1">
          <div>
            <CasesAcrossUnitsBarChart data={statsData?.units} />
          </div>
          <div>
            <CasesForUnitBarChart data={statsData?.units} unit={filter.unit} />
          </div>
        </div>

        <div className="mt-5 grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
          <div>
            <CasePieChart data={statsData?.units} unit={filter.unit} />
          </div>
          <div>
            <CaseCountPieChart caseData={statsData?.cases} />
          </div>
        </div>

        <Heading>Unit Wise Distribution</Heading>
        <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
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

        <Heading className={"mt-12"}>Cases Stats</Heading>
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

        <div className="mt-5 grid gap-8 sm:grid-cols-2 xl:grid-cols-1">
          <div>
            <Heading className={"mt-12 text-center"}>
              Total Cases Across Units
            </Heading>
            <CasesForUnitLineChart data={statsData?.units} />
          </div>
        </div>
      </div>
    </>
  );
}

export const CasesTable = ({ data, isLoading, search = false }) => {
  const [cases, setCases] = useState(data || []);

  const tableConfig = {
    columns: ["unit", "date", "case", "accused name", "remark"],
    data: cases,
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    console.log(value);
    const filtered = value
      ? data.filter(
          (item) => item.note && item.note.toLowerCase().includes(value)
        )
      : data;
    console.log(filtered);
    setCases(filtered);
  };

  if (isLoading) return <div className="my-12 text-center">Loading..</div>;

  return (
    <>
      {search ? (
        <Field>
          <Label>Search</Label>
          <Input placeholder="Accused Name" onInput={handleSearch} />
        </Field>
      ) : null}
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
