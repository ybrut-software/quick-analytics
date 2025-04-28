"use client";

import { Heading } from "@/components/heading";
import { Stat } from "../stat";
import {
  ClientInsightsLineChart,
  FraudByRegionChart,
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
          <Label>NAME OF EST/UNIT/BRS</Label>
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
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>

      <div className="mt-6 grid grid-cols-6">
        <ClientInsightsLineChart />
      </div>
      <div className="mt-6 grid grid-cols-6">
        <ClientInsightsLineChart />
      </div>
    </div>
  );
}
