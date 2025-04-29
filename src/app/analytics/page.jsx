"use client";

import { Heading } from "@/components/heading";
import { Stat } from "../stat";
import {
  ClientInsightsLineChart,
  FraudByRegionChart,
  SocialMediaViolationsPieChart,
  ViolationCasesBarChart,
  ViolationCasesLineChart,
} from "@/components/ui/Charts";
import { Field, Label } from "@/components/fieldset";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/listbox";
import { UNIT_FIELDS } from "../feed/page";

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Heading>Analytics</Heading>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
        <Field>
          <Label>NAME OF EST / UNIT/ BRS</Label>
          <Listbox name="status" defaultValue={UNIT_FIELDS[0].value}>
            {UNIT_FIELDS.map((i) => (
              <ListboxOption value={i.value} key={i.value}>
                <ListboxLabel>{i.label}</ListboxLabel>
              </ListboxOption>
            ))}
            <ListboxOption value="active"></ListboxOption>
          </Listbox>
        </Field>
      </div>

      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
        {CASE_FIELDS.map((i) => {
          return <Stat title={i.label} value={i.value} change="0" />;
        })}
      </div>

      <div className="mt-6">
        <ViolationCasesLineChart />
      </div>
      <div className="mt-6">
        <ViolationCasesBarChart />
      </div>
      <div className="mt-6">
        <SocialMediaViolationsPieChart />
      </div>
    </div>
  );
}

const CASE_FIELDS = [
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
  { label: "Mutiny", value: "mutiny" },
  { label: "Loss of Iden/ Docus", value: "0" },
  { label: "No of BOO conducted", value: "14" },
];
