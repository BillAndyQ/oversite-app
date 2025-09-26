"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

type FieldSelectObjectProps = {
  keys: string[] // ej: ["razon_social", "ruc"]
  data: Record<string, any>[] // array de objetos
  labels?: Record<string, string> // etiquetas opcionales para cada key
}

export function FieldsSelectData({ keys, data, labels }: FieldSelectObjectProps) {
  // índice seleccionado en todos los selects
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)

  return (
    <>
      {keys.map((key) => (
        <FormField
          key={key}
          name={key}
          render={({ field }) => (
            <FormItem>
              {labels?.[key] && <FormLabel>{labels[key]}</FormLabel>}
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    // buscamos el índice del valor en data
                    const idx = data.findIndex((item) => String(item[key]) === value)
                    if (idx !== -1) {
                      setSelectedIndex(idx)
                      // actualizamos también el valor en el form
                      field.onChange(value)
                    }
                  }}
                  value={
                    selectedIndex !== null ? String(data[selectedIndex][key]) : field.value
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Selecciona ${labels?.[key] ?? key}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((item, idx) => (
                      <SelectItem key={idx} value={String(item[key])}>
                        {String(item[key])}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  )
}
