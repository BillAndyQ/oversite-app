"use client"
import { DataTable } from "../components/data-table"
import { useApiClient } from "@/lib/apiClient"
import { ENDPOINTS } from "@/data/endpoints"
import { useEffect, useState } from "react"
import { columnsEquipos } from "./columnsEquipos"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PageEquipos() {
  const { request } = useApiClient() 
  const [data, setData] = useState([])

  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await request(ENDPOINTS.cotizacion.equipos.list)
        setData(result.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [request])

  function createQuotation() {
    async function fetchData() {
      try {
        const result = await request(ENDPOINTS.cotizacion.equipos.create)
        console.log(result.data)
        if(result.data.n_quotation) {
          router.push(`/cotizacion/equipo/${result.data.n_quotation}`)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }
  

  return (
    <div>
      <DataTable columns={columnsEquipos} data={data}>
        <Button size="sm" onClick={createQuotation}>+ Cotizacion</Button>
      </DataTable>
    </div>
  )
}
