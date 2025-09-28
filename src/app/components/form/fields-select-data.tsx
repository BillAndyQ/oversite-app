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

import { useFormContext } from "react-hook-form"

type FieldSelectObjectProps = {
  keys: string[] // ej: ["razon_social", "ruc"]
  data: Record<string, any>[] // array de objetos
  labels?: Record<string, string> // etiquetas opcionales para cada key
}

export function FieldsSelectData({ keys, data, labels }: FieldSelectObjectProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)
  const { setValue } = useFormContext()

  const handleChange = (idx: number) => {
    setSelectedIndex(idx)
    // actualiza todos los campos del form
    keys.forEach((key) => {
      setValue(key, data[idx][key])
    })
  }

  return (
    <>
      {keys.map((key) => (
        <FormField
          
          key={key}
          name={key}
          render={({ field }) => (
            <FormItem className="w-full">
              {labels?.[key] && <FormLabel>{labels[key]}</FormLabel>}
              <FormControl className="w-full">
                <Select
                  onValueChange={(value) => {
                    const idx = data.findIndex((item) => String(item[key]) === value)
                    if (idx !== -1) handleChange(idx)
                  }}
                  value={selectedIndex !== null ? String(data[selectedIndex][key]) : field.value}
                >
                  <SelectTrigger className="w-full">
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
