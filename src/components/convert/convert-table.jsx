import { ConvertTableData } from "./convert-table-data";

import { useTableStore } from "@/store";

export const ConvertTable = () => {
  const { tableData } = useTableStore();

  return (
    tableData.length > 0 && (
      <ConvertTableData columns={tableData} data={tableData} />
    )
  );
};
