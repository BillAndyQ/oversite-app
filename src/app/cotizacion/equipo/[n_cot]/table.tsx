"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FieldMoney } from "@/app/components/form/field-money"
import { ServiceType } from "@/app/enums/service-type"
import { FieldSelectEnum } from "@/app/components/form/field-select-enum"
const schema = z.object({
  productos: z.array(
    z.object({
      nombre: z.string(),
      precio: z.number(),
      igv: z.number(),
      cantidad: z.number(),
    })
  ),
})

type FormValues = z.infer<typeof schema>

export default function ProductosForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      productos: [{ nombre: "", precio: 0, igv: 0, cantidad: 1 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "productos",
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="ps-2 text-left">N°</th>
              <th className="pe-2 text-left">Tipo Servicio</th>
              <th className="p-2 text-left">Tipo Unidad</th>
              <th className="p-2 text-left">IGV</th>
              <th className="p-2 text-left">Precio U.</th>
              <th className="p-2 text-left">IGV</th>
              <th className="p-2 text-left">Subtotal</th>
              <th className="p-2 text-left">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="ps-2">{index + 1}</td>

                <td className="p-2">
                  <FieldSelectEnum enumObject={ServiceType} name={`productos.${index}.tipo`}/>
                </td>

                <td className="w-28 pe-2">
                  <FieldMoney name={`productos.${index}.precio`}/>
                </td>

                <td className="p-2">
                  <FormField
                    control={form.control}
                    name={`productos.${index}.cantidad`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </td>

                <td className="p-2">
                  <FormField
                    control={form.control}
                    name={`productos.${index}.cantidad`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </td>
                <td className="p-2">
                  <FormField
                    control={form.control}
                    name={`productos.${index}.cantidad`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </td>
                <td className="p-2">
                  <FormField
                    control={form.control}
                    name={`productos.${index}.cantidad`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </td>
                <td className="p-2">
                  <FormField
                    control={form.control}
                    name={`productos.${index}.cantidad`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </td>


                <td className="p-2">
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button
          type="button"
          onClick={() =>
            append({ nombre: "", precio: 0, igv: 0, cantidad: 1 })
          }
        >
          + Agregar producto
        </Button>

        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  )
}
