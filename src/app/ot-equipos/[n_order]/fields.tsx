// fields.ts
import { z } from "zod"

export const formSchema = z.object({
    enterprise: z.string().min(2, "Mínimo 2 caracteres"),
    ruc: z.string().min(2, "Mínimo 2 caracteres"),
    date_service: z.string().min(2, "Mínimo 2 caracteres"),
    address: z.string().min(2, "Mínimo 2 caracteres"),
    inspector: z.string().min(2, "Mínimo 2 caracteres"),
    status: z.boolean(),
})


export type FormValues = z.infer<typeof formSchema>
