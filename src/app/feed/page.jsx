"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { addCase } from "@/api/cases";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
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

import { ExcelMultiSheetPreview } from "../../components/feeds/ExcelMultiSheetPreview";

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

export default function FeedPage() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between">
        <Heading>Feed | Case Submission </Heading>
        <div className="flex gap-3">
          <Button outline type="button" onClick={() => setIsOpen(true)}>
            &#8681; Import Feeds
          </Button>
          <Button
            type="button"
            onClick={() => {
              router.push("/feeds");
            }}
          >
            View Feeds
          </Button>
        </div>
      </div>
      <CreateFeedForm />
      <ImportFeedDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => setIsOpen(false)}
      />
    </div>
  );
}

export const CreateFeedForm = () => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
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
    mutation.mutate(formData);
  };

  return (
    <>
      <form className="my-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <Fieldset disabled={mutation.isPending}>
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
          </FieldGroup>

          <FieldGroup>
            <Field>
              <Label>Accused Name</Label>
              <Input
                {...register("note", {
                  required: {
                    value: true,
                    message: "Required Field",
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
      ;
    </>
  );
};

export const ImportFeedDialog = ({
  open = false,
  onSuccess = null,
  onClose = null,
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} size="4xl">
        <DialogTitle>Bulk Feed Import – Upload CSV or Excel File</DialogTitle>
        <DialogDescription>
          Upload a .csv or .xlsx file to import multiple feeds in one go.
          Preview will display valid and invalid rows. Issues such as missing
          data or duplicates will be highlighted, and you’ll have the option to
          download an error log. After validation, proceed by clicking "Import
          Now" to complete the upload.
        </DialogDescription>
        <DialogBody>
          <ExcelMultiSheetPreview onSuccess={onSuccess} />
        </DialogBody>
        <DialogActions>
          <Button plain onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
