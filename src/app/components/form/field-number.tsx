"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function FieldNumber({ name, label = name }: { name: string, label?: string }) {
  return (
    <FormField
      name={name.toLowerCase()}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
          <Input
            type="number"
            {...field}
            value={field.value ?? ""}
            onChange={(e) =>
              field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
            }
            placeholder="0"
          />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
