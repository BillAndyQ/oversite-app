"use client"
import { DataTable } from "../components/data-table"
import { useApiClient } from "@/lib/apiClient"
import { ENDPOINTS } from "@/data/endpoints"
import { useEffect, useState } from "react"
import { columnsPersonas } from "./columnsPersonas"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PagePersonas() {
  const { request } = useApiClient() 
  const [data, setData] = useState([])

  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await request(ENDPOINTS.cotizacion.personas.list)
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
        const result = await request(ENDPOINTS.cotizacion.personas.create)
        console.log(result.data)
        if(result.data.n_quotation) {
          router.push(`/cotizacion/persona/${result.data.n_quotation}`)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }
  

  return (
    <div>
      <DataTable columns={columnsPersonas} data={data}>
        <Button size="sm" onClick={createQuotation}>+ Cotizacion</Button>
      </DataTable>
    </div>
  )
}
