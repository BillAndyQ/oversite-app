"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"



export function FieldSelectEnum({
  name,
  enumObject,
  label
}: {
  name: string
  enumObject: any
  label?: string
}) {

  return (
        <FormField
          name={name}
          render={({ field }) => (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={label ? `Selecciona un ${label}` : "Seleccione"} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(enumObject).map(([key, value]) => (
                      <SelectItem key={key} value={value as string}>
                        {value as string}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}
