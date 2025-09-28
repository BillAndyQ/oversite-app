"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash } from 'lucide-react';
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FieldMoney } from "@/app/components/form/field-money"
import { ServiceType } from "@/app/enums/service-type"
import { FieldSelectEnum } from "@/app/components/form/field-select-enum"
import { UnitType } from "@/app/enums/unit-type"
import { useEffect, useRef } from "react";

const schema = z.object({
  unidades: z.array(
    z.object({
      service_type: z.string(),
      unit_type: z.string(),
      unit_soles: z.number(),
      unit_dollars: z.number(),
      unit_igv_soles: z.number(),
      unit_igv_dollars: z.number(),
      unit_subtotal_soles: z.number(),
      unit_subtotal_dollars: z.number()
    })
  ),
})

const defValuesCell = { service_type: "", unit_type: "", unit_soles: NaN, unit_dollars: NaN, unit_igv_soles: NaN, unit_igv_dollars: NaN, unit_subtotal_soles: NaN, unit_subtotal_dollars: NaN }

type FormValues = z.infer<typeof schema>


export default function UnidadesForm({type_currency, showExchange, tipoCambio}: {type_currency: string, showExchange: boolean, tipoCambio: number}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      unidades: [defValuesCell],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "unidades",
  })

  const prevValuesRef = useRef({
    type_currency: "",
    tipoCambio: 0
  });
  
  


  useEffect(() => {
    const prev = prevValuesRef.current;
  
    const typeCurrencyChanged = prev.type_currency !== type_currency;
    const tipoCambioChanged = prev.tipoCambio !== tipoCambio;
  
    // ✅ Si el cambio de tipoCambio se debe SOLO al cambio de moneda, lo ignoramos
    if (tipoCambioChanged && typeCurrencyChanged) {
      // No recalcular en este caso
      prevValuesRef.current = { type_currency, tipoCambio };
      return;
    }
  
    // ✅ Si realmente cambió el tipo de cambio (desde un input manual), sí recalculamos
    if (tipoCambioChanged) {
      recalculateValues();
    }
  
    // ✅ Si solo cambió la moneda SIN tocar tipoCambio, NO recalculamos
    prevValuesRef.current = { type_currency, tipoCambio };
  }, [type_currency, tipoCambio]);

  const recalculateValues = () => {
    const unidades = form.getValues("unidades") || [];
  
    unidades.forEach((unidad, index) => {
      const valueSoles = unidad.unit_soles;
      const valueDollars = unidad.unit_dollars;
  
      // 👉 Si escribiste en SOLES (base PEN)
      if (type_currency === "PEN" && valueSoles) {
        const igv_soles = +(valueSoles * 0.18).toFixed(2);
        const subtotal_soles = +(valueSoles + igv_soles).toFixed(2);
        form.setValue(`unidades.${index}.unit_igv_soles`, igv_soles);
        form.setValue(`unidades.${index}.unit_subtotal_soles`, subtotal_soles);
  
        // ✅ Solo convertir a dólares, NO sobreescribir soles
        if (tipoCambio) {
          const unit_dollars = +(valueSoles / tipoCambio).toFixed(2);
          form.setValue(`unidades.${index}.unit_dollars`, unit_dollars);
        }
      }
  
      // 👉 Si escribiste en DÓLARES (base USD)
      if (type_currency === "USD" && valueSoles) {
        const igv_dollars = +(valueDollars * 0.18).toFixed(2);
        const subtotal_dollars = +(valueDollars + igv_dollars).toFixed(2);
        form.setValue(`unidades.${index}.unit_igv_dollars`, igv_dollars);
        form.setValue(`unidades.${index}.unit_subtotal_dollars`, subtotal_dollars);
  
        // ✅ Solo convertir a soles, NO sobreescribir dólares
        if (tipoCambio) {
          const unit_soles = +(valueDollars * tipoCambio).toFixed(2);
          form.setValue(`unidades.${index}.unit_soles`, unit_soles);
        }
      }
    });
  }
  

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <div className="w-min overflow-x-auto">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <table className="text-sm table-auto mt-5">
          <thead>
            <tr>
              <th className="p-2 text-left">N°</th>
              <th className="pe-2 text-left">Tipo Servicio</th>
              <th className="p-2 text-left">Tipo Unidad</th>
              {(type_currency === "PEN" || showExchange) && <th className="p-2 text-left">P. Unidad S/</th>}
              {(type_currency === "USD" || showExchange) && <th className="p-2 text-left">P. Unidad $</th>}
              {(type_currency === "PEN" || showExchange) && <th className="p-2 text-left">IGV S/</th>}
              {(type_currency === "USD" || showExchange) && <th className="p-2 text-left">IGV $</th>}
              {(type_currency === "PEN" || showExchange) && <th className="p-2 text-left">Subtotal S/</th>}
              {(type_currency === "USD" || showExchange) && <th className="p-2 text-left">Subtotal $</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="p-2">{index + 1}</td>

                <td className="pe-2">
                  <FieldSelectEnum enumObject={ServiceType} name={`unidades.${index}.service_type`}/>
                </td>

                <td className="p-1">
                  <FieldSelectEnum enumObject={UnitType} name={`unidades.${index}.unit_type`}/>
                </td>

                {(type_currency === "PEN" || showExchange) && <td className="w-28 p-1">
                  <FieldMoney currency="PEN" name={`unidades.${index}.unit_soles`}
                  onChange={(value) => {
                    // Base en soles
                    if(value) {
                      form.setValue(`unidades.${index}.unit_soles`, value);
                  
                    // IGV y subtotal en soles
                    const igv_soles = +(value * 0.18).toFixed(2);
                    const subtotal_soles = +(value + igv_soles).toFixed(2);
                    form.setValue(`unidades.${index}.unit_igv_soles`, igv_soles);
                    form.setValue(`unidades.${index}.unit_subtotal_soles`, subtotal_soles);
                  
                    // Si hay conversión activa
                    if (tipoCambio) {
                        const unit_dollars = +(value / tipoCambio).toFixed(2);
                        const igv_dollars = +(unit_dollars * 0.18).toFixed(2);
                        const subtotal_dollars = +(unit_dollars + igv_dollars).toFixed(2);
                        form.setValue(`unidades.${index}.unit_dollars`, unit_dollars);
                        form.setValue(`unidades.${index}.unit_igv_dollars`, igv_dollars);
                        form.setValue(`unidades.${index}.unit_subtotal_dollars`, subtotal_dollars);
                    }
                  }
                  
                  }}
                  />
                </td>}

                {(type_currency === "USD" || showExchange) && <td className="w-28 p-1">
                  <FieldMoney name={`unidades.${index}.unit_dollars`} 
                  onChange={(value) => {
                    if(value) {
                    form.setValue(`unidades.${index}.unit_dollars`, value);
                  
                    const igv_dollars = +(value * 0.18).toFixed(2);
                    const subtotal_dollars = +(value + igv_dollars).toFixed(2);
                    form.setValue(`unidades.${index}.unit_igv_dollars`, igv_dollars);
                    form.setValue(`unidades.${index}.unit_subtotal_dollars`, subtotal_dollars);
                  
                    // Solo convertir si hay valor válido
                    if (tipoCambio && value) {
                      const unit_soles = +(value * tipoCambio).toFixed(2);
                      const igv_soles = +(unit_soles * 0.18).toFixed(2);
                      const subtotal_soles = +(unit_soles + igv_soles).toFixed(2);
                      form.setValue(`unidades.${index}.unit_soles`, unit_soles);
                      form.setValue(`unidades.${index}.unit_igv_soles`, igv_soles);
                      form.setValue(`unidades.${index}.unit_subtotal_soles`, subtotal_soles);
                    }
                  }
                  }}
                  
                  />
                </td>}

                {(type_currency === "PEN" || showExchange) && <td className="w-28 p-1">
                  <FieldMoney currency="PEN" name={`unidades.${index}.unit_igv_soles`} />
                </td>}

                {(type_currency === "USD" || showExchange) && <td className="w-28 p-1">
                  <FieldMoney name={`unidades.${index}.unit_igv_dollars`} />
                </td>}

                {(type_currency === "PEN" || showExchange) && <td className="w-28 p-1">
                  <FieldMoney currency="PEN" name={`unidades.${index}.unit_subtotal_soles`} 
                   onChange={(value) => {

                    const base = +(value / 1.18).toFixed(2);
                    const igv = +(value - base).toFixed(2);
                    form.setValue(`unidades.${index}.unit_soles`, base);
                    form.setValue(`unidades.${index}.unit_igv_soles`, igv);
                    form.setValue(`unidades.${index}.unit_subtotal_soles`, value); // mantengo subtotal
                  }}
                  />
                </td>}

                {(type_currency === "USD" || showExchange) && <td className="w-28 p-1">
                  <FieldMoney name={`unidades.${index}.unit_subtotal_dollars`} />
                </td>}

                <td className="p-2">
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    <Trash size={16}/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={() =>
            append(defValuesCell)
          }
        >
          + Unidad
        </Button>

        <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
