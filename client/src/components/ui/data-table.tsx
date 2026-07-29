import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { useState } from "react"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  
}

export function DataTable<TData, TValue>({
  columns,
  data,
  
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });


  return (
    <div className="overflow-hidden rounded-md border flex items-center justify-center w-full  border-gray-hot">
      <Table className="bg-background-base border border-gray-hot">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="border border-gray-hot bg-gray-hot/50 text-primary" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="text-xs lg:text-sm" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => 
            {
            
              return (
              <TableRow
              
              className={`border border-gray-hot cursor-pointer hover:bg-gray-hot/50 h-16 `}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  // Identify action/link columns by id or header text
                  const colId = cell.column.id;
                  // For header, check if it's a string and matches known action columns
                  let isActionCol = false;
                  if (typeof cell.column.columnDef.header === "string") {
                    isActionCol = ["Actions", "Voir", "Ref / Tracking"].includes(cell.column.columnDef.header);
                  } else if (colId) {
                    isActionCol = ["Actions", "Voir", "Ref / Tracking"].includes(colId);
                  }
                  return (
                    <TableCell key={cell.id}
                      {...(isActionCol ? {
                        onClick: (e) => {
                          e.stopPropagation();
                        }
                      } : {})}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            )
            }
            )
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-16 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}