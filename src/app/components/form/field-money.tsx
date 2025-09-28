"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { NumericFormat } from "react-number-format"

type Props = {
  name: string
  label?: string
  currency?: string // Ej: "USD", "PEN", "EUR"
  locale?: string   // Ej: "en-US", "es-PE"
  onChange?: (value: number) => void
}

export function FieldMoney({ name, label, currency = "USD", onChange }: Props) {
  return (
    <FormField
      name={name.toLowerCase()}
      render={({ field }) => (
        <FormItem className="w-28">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <NumericFormat
              id={name}
              name={name}
              className="w-28 border rounded-md px-3 py-2"
              placeholder="0.00"
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              prefix={currency === "USD" ? "$" : "S/"}
              value={field.value ?? ""}
              onValueChange={(values: any) => {
                field.onChange(values.floatValue ?? undefined)
                onChange?.(values.floatValue ?? undefined)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
