"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { createColumn } from "../components/data-table-create-column"

export type OT_Personas = {
  n_order: string,
  enterprise : string,
  ruc : string,
  inspector : string,
  mode : string,
  course : string,
  names : string,
  lastnames : string,
  dni : string,
  date : string,
  approved : string,
  certifier : string,
  project : string,
  instructor : string,
  n_times : string,
  comments : string,
  status : string,

}

export const columns: ColumnDef<OT_Personas>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      return <Link href={`/ot-personas/${row.original.n_order}`}><ExternalLink size={16}/></Link>
    },
  },
  createColumn("n_order", "N Orden"),
  createColumn("enterprise", "Empresa"),
  createColumn("ruc", "RUC"),
  createColumn("inspector", "Inspector"),
  createColumn("mode", "Modo"),
  createColumn("course", "Curso"),
  createColumn("names", "Nombres"),
  createColumn("lastnames", "Apellidos"),
  createColumn("dni", "DNI"),
  createColumn("date", "Fecha"),
  createColumn("approved", "Aprobado"),
  createColumn("certifier", "Certificador"),
  createColumn("project", "Proyecto"),
  createColumn("instructor", "Instructor"),
  createColumn("n_times", "N Veces"),
  createColumn("comments", "Comentarios"),
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