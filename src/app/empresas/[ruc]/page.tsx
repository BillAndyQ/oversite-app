"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useApiClient } from '@/lib/apiClient'
import { ENDPOINTS } from '@/data/endpoints'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, FormValues } from './fields'
import { getDefaults } from '@/lib/form-get-default'
import { FieldText } from '@/app/components/form/field-text'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

export default function page() {
    const params = useParams()
    const ruc = params.ruc

    const {request} = useApiClient()
    const [data, setData] = useState([])
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: getDefaults(formSchema),
  })

    useEffect(() => {
    async function fetchData() {
        try {
        const result = await request(ENDPOINTS.empresas.get(ruc as string))
        setData(result.data)
        form.reset(result.data)
        console.log(result.data)
        } catch (err) {
        console.error(err)
        }
    }
    fetchData()
    }, [request])


    function updateData(values: FormValues) {
        async function fetchData() {
            try {
            const result = await request(ENDPOINTS.empresas.update(ruc as string), {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FieldText name="ruc" label="RUC"/>
        <FieldText name="razon_social" label="Razon Social"/>
        <FieldText name="direccion" label="Dirección"/>
        <FieldText name="telefono" label="Telefono"/>
        <FieldText name="email" label="Email"/>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
