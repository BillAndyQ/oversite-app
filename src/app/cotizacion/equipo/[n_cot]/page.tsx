"use client"
import React, { useEffect, useState } from "react"
import { formSchema } from "./fields"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldErrors, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FieldText } from "@/app/components/form/field-text"
import { FormValues } from "./fields"
import { getDefaults } from "@/lib/form-get-default"
import { useApiClient } from "@/lib/apiClient"
import { ENDPOINTS } from "@/data/endpoints"
import { useParams } from "next/navigation"
import { FieldSelectEnum } from "@/app/components/form/field-select-enum"
import { Status } from "@/app/enums/quotation"
import { CardTitle } from "@/components/ui/card"
import ProductosForm from "./table"
import { FieldsSelectData } from "@/app/components/form/fields-select-data"

export default function Page() {
  const {request} = useApiClient()
  const [data, setData] = useState([])
  const [empresas, setEmpresas] = useState<Record<string, any>[]>([])
  const params = useParams()
  const n_cot = params.n_cot

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaults(formSchema),
  })

  const {formState, handleSubmit, reset} = form

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await request(ENDPOINTS.cotizacion.equipos.get(n_cot as string))
        setData(result.data)
        reset(result.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [request])

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const result = await request(ENDPOINTS.empresas.get())
        setEmpresas(result.data)
        console.log(result.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchEmpresas()
  }, [request])

  function updateData(values: FormValues) {
    async function fetchData() {
        try {
        const result = await request(ENDPOINTS.cotizacion.equipos.update(n_cot as string), {
            body: values,
        })
        setData(result.data)
        console.log(result.data)
        } catch (err) {
        console.error(err)
        }
    }
    fetchData()
  }



  function onSubmit(values: FormValues) {
    console.log(values)
    updateData(values)
  }

  function onError(errors: FieldErrors<FormValues>) {
    console.log(errors)
  }

  return (
    <div>
    <Form {...form}>
      <CardTitle className="mb-6 text-lg">N° Cotización: {n_cot}</CardTitle>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FieldsSelectData
          keys={["razon_social", "ruc"]}
          data={empresas}
          labels={{razon_social: "Empresa", ruc: "RUC"}}
        />
        <FieldText name="ruc" label="RUC"/>
        <FieldSelectEnum name="status" label="Estado" enumObject={Status}/>
        </div>

        
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
        <ProductosForm/>
    </div>
  )
}
