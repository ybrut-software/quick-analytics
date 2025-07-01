import jsPDF from "jspdf";
import { autoTable, applyPlugin } from "jspdf-autotable";
import { useCallback } from "react";
import { camelCaseToText } from "../utils/caseConvertUtils";

applyPlugin(jsPDF);

export const useJsonToPdf = () => {
  const generatePdf = useCallback(
    ({
      jsonData,
      headerName = "Data Report",
      includeKeys = [],
      excludeKeys = [],
      fileName = "report.pdf",
      orientation = "landscape",
    }) => {
      // Initialize jsPDF in landscape mode
      const doc = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: "a4",
      });

      // Ensure autoTable is available
      if (typeof doc.autoTable !== "function") {
        autoTable(doc); // Register the autoTable plugin with jsPDF
      }

      // Set font styles
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);

      // Add header
      doc.text(headerName, 14, 20);

      // Reset font for table
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      // Process data
      let data = Array.isArray(jsonData) ? jsonData : [jsonData];

      // Get headers
      let headers = [];
      if (data.length > 0) {
        headers = Object.keys(data[0]).filter((key) => {
          if (includeKeys.length > 0) {
            return includeKeys.includes(key) && !excludeKeys.includes(key);
          }
          return !excludeKeys.includes(key);
        });
      }

      // Prepare table data
      const parsedHeaderNames = headers.map((key) => camelCaseToText(key));
      const tableData = data.map((item) =>
        headers.map((key) => item[key] ?? "")
      );

      // Generate table
      doc.autoTable({
        startY: 30,
        head: [parsedHeaderNames],
        body: tableData,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: 30, left: 14, right: 14, bottom: 14 },
      });

      // Save the PDF
      doc.save(fileName);
    },
    []
  );

  return { generatePdf };
};

export default useJsonToPdf;
