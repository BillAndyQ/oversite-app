"use client"
import { DataTable } from "../components/data-table"
import { useApiClient } from "@/lib/apiClient"
import { ENDPOINTS } from "@/data/endpoints"
import { useEffect, useState } from "react"
import { columnsEquipos } from "./columnsEquipos"

export default function PageEquipos() {
  const { request } = useApiClient() 
  const [data, setData] = useState([])

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
  

  return (
      <DataTable columns={columnsEquipos} data={data} />
  )
}
