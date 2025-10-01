"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { createColumn } from "../components/data-table-create-column"

export type OT_Personas = {
  n_quotation : string,
  enterprise : string,
  ruc : string,
  names : string,
  last_names : string,
  dni : string,
  total_soles : number,
  certifier : string,
  total_dollars: number;
  total_igv_soles: number;
  total_igv_dollars: number;
  type_currency: string;
  exchange_rate: number;
  status : string
}

export const columnsPersonas: ColumnDef<OT_Personas>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      return <Link href={`/cotizacion/persona/${row.original.n_quotation}`}><ExternalLink size={16}/></Link>
    },
  },
  createColumn("n_quotation", "N Cotizacion"),
  createColumn("enterprise", "Empresa"),
  createColumn("ruc", "RUC"),
  createColumn("names", "Nombres"),
  createColumn("last_names", "Apellidos"),
  createColumn("dni", "DNI"),
  createColumn("certifier", "Certificador"),
  createColumn("total_soles", "Total S/"),
  createColumn("total_dollars", "Total $"),
  createColumn("total_igv_soles", "Total IGV S/"),
  createColumn("total_igv_dollars", "Total IGV $"),
  createColumn("type_currency", "Tipo Moneda"),
  createColumn("exchange_rate", "Tipo Cambio"),
  createColumn("status", "Estado"),
  
]