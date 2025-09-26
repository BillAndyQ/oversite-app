"use client"
import React from 'react'
import { useApiClient } from '@/lib/apiClient'
import { ENDPOINTS } from '@/data/endpoints'
import { useEffect, useState } from 'react'
import { columns } from './columns'
import { DataTable } from '../components/data-table'

export default function page() {
    const {request} = useApiClient()
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await request(ENDPOINTS.empresas.list)
                setData(result.data)
                console.log(result.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [request])

    return (
        <DataTable columns={columns} data={data} />
    )
}
