"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../components/data-table-column-header"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export type Empresa = {
  ruc: string,
  enterprise : string,
  direccion : string,
  telefono : string,
  email : string,
}


function createColumn<T>(accessorKey: keyof T, title: string): ColumnDef<T> {
  
  return {
    accessorKey: accessorKey as string,
    id: title,
    header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
  }
}

export const columns: ColumnDef<Empresa>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      return <Link href={`/empresas/${row.original.ruc}`}><ExternalLink size={16}/></Link>
    },
  },
  createColumn("ruc", "RUC"),
  createColumn("enterprise", "Empresa"),
  createColumn("direccion", "Dirección"),
  createColumn("telefono", "Telefono"),
  createColumn("email", "Email"),

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