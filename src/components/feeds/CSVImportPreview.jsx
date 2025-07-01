import { Button } from "@/components/button";
import { Field, Label } from "@/components/fieldset";
import { Input } from "@/components/input";
import Papa from "papaparse";
import { useState } from "react";

export const CSVImportPreview = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState("");

  const ACCEPTED_FORMAT =
    ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file?.name || "");

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log("results", results);
        const rows = results.data;
        const headers = results.meta.fields;
        setHeaders(headers);
        setData(rows);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      },
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Import CSV File</h2>

      <Field>
        <Label>Upload File</Label>
        <Input
          type="file"
          accept={ACCEPTED_FORMAT}
          onChange={handleFileUpload}
        />
      </Field>

      {fileName && (
        <p className="text-sm text-gray-600">Previewing: {fileName}</p>
      )}

      {JSON.stringify(data)}

      {data.length > 0 && (
        <div className="overflow-auto border rounded-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-4 py-2 border-b">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, idx) => (
                <tr key={idx} className="border-t">
                  {headers.map((header) => (
                    <td key={header} className="px-4 py-2 border-b">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > 10 && (
            <div className="p-2 text-sm text-gray-500">
              Showing first 10 of {data.length} rows
            </div>
          )}
        </div>
      )}

      {data.length > 0 && (
        <Button variant="primary" className="mt-4">
          Import Now
        </Button>
      )}
    </div>
  );
};
