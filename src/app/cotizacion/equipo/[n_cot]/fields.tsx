// fields.ts
import { z } from "zod"

export const formSchema = z.object({
    enterprise: z.string().min(2, "Mínimo 2 caracteres"),
    ruc: z.string().min(2, "Mínimo 2 caracteres"),
    status: z.string().min(2, "Mínimo 2 caracteres"),
    type_currency: z.string().min(2, "Mínimo 2 caracteres"),
    exchange_rate: z.number().nullable().optional(),
})


export type FormValues = z.infer<typeof formSchema>
