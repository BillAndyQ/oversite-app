"use client"
import React, { useEffect, useState } from "react"
import { formSchema } from "./fields"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FieldText } from "@/app/components/form/field-text"
import { FormValues } from "./fields"
import { getDefaults } from "@/lib/form-get-default"
import { useApiClient } from "@/lib/apiClient"
import { ENDPOINTS } from "@/data/endpoints"
import { useParams } from "next/navigation"


export default function Page() {
  const {request} = useApiClient()
  const [data, setData] = useState([])
  const params = useParams()
  const n_order = params.n_order

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await request(ENDPOINTS.otequipos.get(n_order as string))
        setData(result.data)
        reset(result.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [request])


  useEffect(() => {
    async function fetchData() {
      try {
        const result = await request(ENDPOINTS.unidades.listByOrder(n_order as string))
        console.log(result.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [request])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaults(formSchema),
  })

  const {formState, handleSubmit, reset} = form

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FieldText name="enterprise" label="Empresa"/>
        <FieldText name="ruc" label="RUC"/>
        <FieldText name="date_service" label="Fecha de servicio"/>
        <FieldText name="address" label="Dirección"/>
        <FieldText name="status" label="Estado"/>
        </div>
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
