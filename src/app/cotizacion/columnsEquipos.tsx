"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { createColumn } from "../components/data-table-create-column"

export type OT_Equipos = {
  n_quotation : string,
  enterprise : string,
  ruc : string,
  total_soles : number,
  total_dollars: number;
  total_igv_soles: number;
  total_igv_dollars: number;
  type_currency: string;
  exchange_rate: number;
  status : string;
  certifier : string;
}

export const columnsEquipos: ColumnDef<OT_Equipos>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      return <Link href={`/cotizacion/equipo/${row.original.n_quotation}`}><ExternalLink size={16}/></Link>
    },
  },
  createColumn("n_quotation", "N Cotizacion"),
  createColumn("enterprise", "Empresa"),
  createColumn("ruc", "RUC"),
  createColumn("total_soles", "Total S/"),
  createColumn("total_dollars", "Total $"),
  createColumn("total_igv_soles", "Total IGV S/"),
  createColumn("total_igv_dollars", "Total IGV $"),
  createColumn("type_currency", "Tipo Moneda"),
  createColumn("exchange_rate", "Tipo Cambio"),
  createColumn("status", "Estado"),
  createColumn("certifier", "Certificador"),
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original
 
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]