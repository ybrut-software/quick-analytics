import useJsonToPdf from "@/hooks/useJsonToPdf";
import { Button } from "../button";

export const ExportPdf = ({
  name = "Export",
  data,
  includeKeys = [],
  excludeKeys = [],
}) => {
  const { generatePdf } = useJsonToPdf();

  const handleGeneratePdf = () => {
    generatePdf({
      jsonData: data,
      headerName: "Report",
      includeKeys,
      // excludeKeys,
      fileName: "report.pdf",
    });
  };

  return (
    <>
      <Button outline onClick={handleGeneratePdf}>
        {name}
      </Button>
    </>
  );
};
