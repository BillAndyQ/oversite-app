"use client"
import { columns } from "./columns"
import { DataTable } from "../components/data-table"
import { useApiClient } from "@/lib/apiClient"
import { ENDPOINTS } from "@/data/endpoints"
import { useEffect, useState } from "react"

export default function Page() {
  const { request } = useApiClient() 
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await request(ENDPOINTS.otequipos.list)
        setData(result.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [request])
  

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
