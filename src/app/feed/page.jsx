"use client";

import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/fieldset";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/listbox";
import { Select } from "@/components/select";
import { Text } from "@/components/text";
import { Textarea } from "@/components/textarea";

export default function Home() {
  const handleSubmit = () => {};
  return (
    <div className="max-w-7xl mx-auto">
      <Heading>Feed | Case Submission </Heading>
      <form className="my-8">
        <Fieldset>
          <Legend>Unit Incident and Security Case Reporting Form</Legend>
          <Text>
            Please record and submit all incidents and cases pertaining to your
            unit for the specified reporting period. This data is critical for
            maintaining internal security protocols, operational integrity, and
            regulatory compliance.
          </Text>

          <FieldGroup className="grid gap-12 grid-cols-2">
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

            <Field>
              <Label> Month & Date</Label>
              <Input name={"date"} type="date" />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <div className="grid gap-8 grid-cols-3">
              {CASE_FIELDS.map((i) => (
                <Field key={i.name}>
                  <Label>{i.label}</Label>
                  <Input name={i.name} type="number" />
                </Field>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup>
            {/* Remark */}
            <Field>
              <Label>Remark</Label>
              <Textarea name="remark" />
              <Description>Please Enter Remark</Description>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Button className="me-3">Submit</Button>
            <Button outline>Clear</Button>
          </FieldGroup>
        </Fieldset>
      </form>
    </div>
  );
}

const CASE_FIELDS = [
  { label: "No of PIO Calls recd and Details", name: "no_of_pio_calls" },
  {
    label: "Contact with foreign Nationals",
    name: "contact_with_foreign_nationals",
  },
  { label: "Espionage Cases", name: "espionage_cases" },
  { label: "Social Media Violations", name: "social_media_violations" },
  { label: "Chain Marketing", name: "chain_marketing" },
  { label: "Fake Recruitment", name: "fake_recruitment" },
  { label: "Financial Frauds", name: "financial_frauds" },
  { label: "Cheating Cases", name: "cheating_cases" },
  { label: "Robbery Cases", name: "robbery_cases" },
  { label: "Mutiny", name: "mutiny" },
  { label: "Loss of Iden/ Docus", name: "loss_of_iden_docus" },
  { label: "No of BOO conducted", name: "no_of_boo_conducted" },
];

export const UNIT_FIELDS = Array.from({ length: 15 }, (_, i) => ({
  label: `Unit ${i + 1}`,
  value: `unit ${i + 1}`,
}));
