"use client";

import { addCase } from "@/api/cases";
import { Button } from "@/components/button";
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
import { Select } from "@/components/select";
import { Text } from "@/components/text";
import { Textarea } from "@/components/textarea";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...{
        remark: "Giving information",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: addCase,
    onSuccess: (res) => {
      console.log("res", res);
      alert("Record added successfully!");
      reset();
    },
    onError: (error) => {
      console.error(error);
      alert("Error: " + error.message);
    },
  });

  const handleFormSubmit = (formData) => {
    console.log(formData);
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Heading>Feed | Case Submission </Heading>
      <form className="my-8" onSubmit={handleSubmit(handleFormSubmit)}>
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
              <Label>NAME OF EST / UNIT / BRS</Label>
              <Select
                name="unit"
                {...register("unit", {
                  required: {
                    value: true,
                    message: "Required Field",
                  },
                })}
              >
                {UNIT_FIELDS.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field>
              <Label> Month & Date</Label>
              <Input
                name={"date"}
                type="date"
                {...register("date", {
                  required: {
                    value: true,
                    message: "Required Field",
                  },
                })}
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid gap-12 grid-cols-2">
            <Field>
              <Label>Case</Label>
              <Select
                name="case"
                {...register("case", {
                  required: {
                    value: true,
                    message: "Required Field",
                  },
                })}
              >
                <option>Select Case</option>
                {CASE_FIELDS.map((i, idx) => (
                  <option key={`case-option-${idx}`} value={i.name}>
                    {i.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field>
              <Label>Case Count / Value</Label>
              <Input
                name={"date"}
                type="number"
                {...register("value", {
                  required: {
                    value: true,
                    message: "Required Field",
                  },
                  min: {
                    value: 0,
                    message: "Value cannot be negative",
                  },
                })}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            {/* Remark */}
            <Field>
              <Label>Remark</Label>
              <Textarea
                name="remark"
                {...register("remark", {
                  required: {
                    value: true,
                    message: "Required Field",
                  },
                })}
              />
              <Description>Please Enter Remark</Description>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Button className="me-3" type="subnmit">
              Submit
            </Button>
            <Button outline onClick={() => reset()}>
              Clear
            </Button>
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
