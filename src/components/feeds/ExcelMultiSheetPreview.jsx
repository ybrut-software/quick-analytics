import { useState } from "react";
import * as XLSX from "xlsx";

import { importCases } from "@/api/cases";

import { Divider } from "@/components/divider";
import { Field, Label } from "@/components/fieldset";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { snakCase } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../button";
import Spinner from "../spinner";

export function ExcelMultiSheetPreview({ onSuccess = null }) {
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [workbook, setWorkbook] = useState(null);

  const ImportCaseMutation = useMutation({
    mutationFn: importCases,
    onSuccess: (res) => {
      alert("Data Imported successfully!");
      onSuccess();
    },
    onError: (error) => {
      console.error(error);
      alert("Error: " + error.message);
    },
  });

  const handleImportCases = () => {
    // parse payload
    const parsedPayload = data?.map((i, index) => ({
      ...i,
      unit: `unit-1`,
      case: snakCase(selectedSheet),
    }));

    ImportCaseMutation.mutate(parsedPayload);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const wb = XLSX.read(binaryStr, { type: "binary" });
      setWorkbook(wb);
      setSheetNames(wb.SheetNames);
      setSelectedSheet(wb.SheetNames[0]); // Default to first sheet
      loadSheetData(wb, wb.SheetNames[0]);
    };
    reader.readAsBinaryString(file);
  };

  const loadSheetData = (wb, sheetName) => {
    const worksheet = wb.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    setData(jsonData);
    setHeaders(jsonData.length > 0 ? Object.keys(jsonData[2]) : []);
  };

  const handleSheetChange = (e) => {
    const sheetName = e.target.value;
    setSelectedSheet(sheetName);
    loadSheetData(workbook, sheetName);
  };

  return (
    <div className="space-y-5">
      <Heading>Upload Excel File</Heading>

      <Field>
        <Label>Upload File</Label>
        <Input type="file" onChange={handleFileUpload} />
      </Field>

      {sheetNames.length > 0 && (
        <>
          <Divider />
          <Field>
            <Label>Select Case</Label>
            <Select value={selectedSheet} onChange={handleSheetChange}>
              <option>Select Case</option>
              {sheetNames.map((sheet) => (
                <option key={sheet} value={sheet}>
                  {sheet}
                </option>
              ))}
            </Select>
          </Field>
        </>
      )}

      {data.length > 0 ? (
        <>
          <div className="flex justify-between mt-8">
            <Heading level={6}>Preview Import Data </Heading>
            <Button onClick={handleImportCases}>Confirm & Import</Button>
          </div>
          {ImportCaseMutation.isPending ? <Spinner size="sm" /> : null}
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={`import-table-head-${header}`}>
                    {header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 10).map((row, idx) => (
                <TableRow key={idx}>
                  {headers.map((header) => (
                    <TableCell key={header} className="px-4 py-2 border-b">
                      {row[header]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          <p className="p-5 text-gray-100 text-center">No Data Imported</p>
        </>
      )}
    </div>
  );
}
