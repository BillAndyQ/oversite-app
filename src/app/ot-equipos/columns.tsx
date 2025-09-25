"use client"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "../components/data-table-column-header"

export type OT_Equipos = {
  id : string,
  n_order: string,
  enterprise : string,
  ruc : string,
  data_service : string,
  address : string,
  inspector : string,
  certifier : string,
  unit_type : string,
  service_type : string,
  plate : string,
  status : string
}

function createColumn<T>(accessorKey: keyof T, title: string): ColumnDef<T> {
  return {
    accessorKey: accessorKey as string,
    header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
    meta: { title: title },
  }
}

export const columns: ColumnDef<OT_Equipos>[] = [
  createColumn("n_order", "N Orden"),
  createColumn("enterprise", "Empresa"),
  createColumn("ruc", "RUC"),
  createColumn("data_service", "Fecha de Servicio"),
  createColumn("address", "Dirección"),
  createColumn("inspector", "Inspector"),
  createColumn("certifier", "Certificador"),
  createColumn("unit_type", "Tipo de Unidad"),
  createColumn("service_type", "Tipo de Servicio"),
  createColumn("plate", "Placa"),
  createColumn("status", "Estado"),
  // {
  //   accessorKey: "amount",
  //   header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Amount" />
  //     ),
  //   cell: ({ row }) => {
  //     const payment = row.original
  //     return <div className="font-medium">${payment.amount}</div>
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]