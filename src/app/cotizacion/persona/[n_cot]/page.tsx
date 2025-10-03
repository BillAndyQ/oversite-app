"use client"
import React, { useEffect, useState } from "react"
import { formSchema } from "./fields"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldErrors, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormValues } from "./fields"
import { getDefaults } from "@/lib/form-get-default"
import { useApiClient } from "@/lib/apiClient"
import { ENDPOINTS } from "@/data/endpoints"
import { useParams } from "next/navigation"
import { FieldSelectEnum } from "@/app/components/form/field-select-enum"
import { Status } from "@/app/enums/quotation"
import { CardTitle } from "@/components/ui/card"
import { FieldsSelectData } from "@/app/components/form/fields-select-data"
import { TypeCurrency } from "@/app/enums/type-currency"
import { FieldNumber } from "@/app/components/form/field-number"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Certifiers from "@/app/enums/certifiers"
import { FieldText } from "@/app/components/form/field-text"

interface TipoCambio {
    fecha: string
    compra: number
    venta: number
}

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

  const {handleSubmit } = form
  const [type_currency, setTypeCurrency] = useState("PEN")

  const [applyTypeCurrency, setApplyTypeCurrency] = useState(false)

  const [tipoCambioForm, setTipoCambioForm] = useState(0)

  const [dataTiposCambios, setDataTiposCambios] = useState<TipoCambio>({
    fecha: "",
    compra: 0,
    venta: 0
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await request(ENDPOINTS.cotizacion.personas.get(n_cot as string))
        console.log(result.data)
        setData(result.data)
        setTipoCambioForm(Number(result.data.exchange_rate))
        if(result.data.exchange_rate > 0) {
          setApplyTypeCurrency(true)
        }
        form.reset(result.data)
        if(result.data.type_currency != null) {
          setTypeCurrency(result.data.type_currency)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [request])
  

  useEffect(() => {
    async function fetchTipoCambio() {
      try {
        const result = await request(ENDPOINTS.tipoCambio.get)
        console.log(result.data)
        setDataTiposCambios(result.data)

      } catch (err) {
        console.error(err)
      }
    }
    fetchTipoCambio()
  }, [request])

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const result = await request(ENDPOINTS.empresas.get())
        setEmpresas(result.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchEmpresas()
  }, [request])

  function updateData(values: FormValues) {
    async function fetchData() {
        try {
        const result = await request(ENDPOINTS.cotizacion.personas.update(n_cot as string), {
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
    values.total_soles = total_soles
    values.total_dollars = total_dollars
    values.total_igv_soles = total_igv_soles
    values.total_igv_dollars = total_igv_dollars
    values.subtotal_soles = subtotal_soles
    values.subtotal_dollars = subtotal_dollars
    updateData(values)
  }

  function onError(errors: FieldErrors<FormValues>) {
    console.log(errors)
  }

  const [showExchange, setShowExchange] = useState(false)

  const handleSubmitFromParent = () => {
    const form = document.getElementById("unidades-form") as HTMLFormElement;
    if (form) form.requestSubmit();
  };

  const [total_soles, setTotal_soles] = useState(0)
  const [total_dollars, setTotal_dollars] = useState(0)
  const [total_igv_soles, setTotal_igv_soles] = useState(0)
  const [total_igv_dollars, setTotal_igv_dollars] = useState(0)
  const [subtotal_soles, setSubtotal_soles] = useState(0)
  const [subtotal_dollars, setSubtotal_dollars] = useState(0)
  
  
  return (
    <div>
    <Form {...form}>
      <CardTitle className="mb-6 text-lg">N° Cotización: {n_cot}</CardTitle>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
        
      <FieldSelectEnum name="certifier" label="Certificador" enumObject={Certifiers}/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        <FieldsSelectData
          keys={["enterprise", "ruc"]}
          data={empresas}
          labels={{enterprise: "Empresa", ruc: "RUC"}}
        />
        <div className="flex gap-4">
          <FieldSelectEnum name="status" label="Estado" enumObject={Status}/>
          <FieldSelectEnum name="type_currency" label="Moneda" enumObject={TypeCurrency} onChange={(value) => {
            setTypeCurrency(value)
            form.setValue("exchange_rate", value === "PEN" ? Number(dataTiposCambios.venta) : Number(dataTiposCambios.compra))
            setTipoCambioForm(value === "PEN" ? Number(dataTiposCambios.venta) : Number(dataTiposCambios.compra))
          }}/>
          <FieldNumber name="exchange_rate" label="Tipo Cambio" onChange={(value) => {
            setTipoCambioForm(Number(value))
          }}/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        <FieldText name="names" label="Nombres"/>
        <FieldText name="last_names" label="Apellidos"/>
        <FieldText name="dni" label="DNI"/>
      </div>
      <div className="flex items-center gap-3 p-0 m-0 mb-4">
        <Button
        className="text-xs"
          type="button" 
          variant="secondary"
          onClick={() => {
            setApplyTypeCurrency(!applyTypeCurrency)
            if(applyTypeCurrency) {
              if(type_currency === "PEN") {
                form.setValue("exchange_rate", Number(dataTiposCambios.venta))
                setTipoCambioForm(Number(dataTiposCambios.venta))
              }
              if(type_currency === "USD") {
                form.setValue("exchange_rate", Number(dataTiposCambios.compra))
                setTipoCambioForm(Number(dataTiposCambios.compra))
              }
            }
          }}
        >
          Aplicar
        </Button>
          <span className="text-xs">{dataTiposCambios.fecha} | Venta: {dataTiposCambios.venta} | Compra: {dataTiposCambios.compra}</span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <Checkbox
          id="showExchange"
          checked={showExchange}
          onCheckedChange={(checked) => setShowExchange(!!checked)}
        />
        <Label htmlFor="showExchange">Ver montos convertidos</Label>
      </div>
          
      </form>
    </Form>
        {/* <UnidadesForm 
        type_currency={type_currency} 
        setTotalSoles={setTotal_soles} 
        setTotalDollars={setTotal_dollars} 
        setTotalIgvSoles={setTotal_igv_soles} 
        setTotalIgvDollars={setTotal_igv_dollars} 
        setSubtotalSoles={setSubtotal_soles} 
        setSubtotalDollars={setSubtotal_dollars} 
        tipoCambio={tipoCambioForm} 
        n_cot={n_cot as string} 
        showExchange={showExchange}/> */}
        <Button type="submit" onClick={()=>{
          handleSubmit(onSubmit)();
          handleSubmitFromParent()
        }}>Registrar</Button>
    </div>
  )
}
