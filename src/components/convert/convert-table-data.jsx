import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ConvertTableData({ columns, data }) {
  const createColumns = (data) => {
    // Получаем ключи из первого объекта данных
    if (data.length > 0) {
      const keys = Object.keys(data[0]);

      return keys.map((key) => ({
        id: key,
        accessorKey: key, // Ключ для доступа к данным
        header: () => <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>, // Заголовок с первой заглавной буквой
        cell: ({ row }) => <div>{row.getValue(key)}</div>, // Отображаем значение ячейки
      }));
    }
  };

  const table = useReactTable({
    data,
    columns: createColumns(columns) || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-[#0000]" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="whitespace-nowrap text-[#f2f2f2]"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="hover:bg-[#292929] hover:text-[#f2f2f2]"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="whitespace-nowrap text-[#c3c3c3]"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
