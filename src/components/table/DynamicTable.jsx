import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import Spinner from "../spinner";

export const DynamicTable = ({ data = [], isLoading }) => {
  // Derive columns from the first data object's keys, excluding '_id'
  const columns =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "_id") : [];

  const tableConfig = {
    columns,
    data,
  };

  // Helper function to convert snake_case to words
  const snakeToWords = (str) => {
    if (!str) return "-";
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoading) return <Spinner centerScreen />;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {tableConfig.columns?.map((col) => (
              <TableHeader key={`table-head-${col}`} className="capitalize">
                {snakeToWords(col)}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!data.length ? (
            <TableRow key={Math.random()}>
              <TableCell
                colSpan={tableConfig.columns.length}
                className="font-medium"
              >
                No Data Found
              </TableCell>
            </TableRow>
          ) : null}
          {tableConfig.data?.map((item) => (
            <TableRow key={item._id || Math.random()}>
              {tableConfig.columns.map((col) => (
                <TableCell key={`table-cell-${col}`} className="font-medium">
                  {item[col] ? snakeToWords(item[col].toString()) : "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
