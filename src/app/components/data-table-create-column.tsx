import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"

export function createColumn<T>(accessorKey: keyof T, title: string): ColumnDef<T> {
    return {
      accessorKey: accessorKey as string,
      id: title,
      header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
      meta: { title: title },
    }
  }