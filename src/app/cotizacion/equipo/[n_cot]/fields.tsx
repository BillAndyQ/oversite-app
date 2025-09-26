// fields.ts
import { z } from "zod"

export const formSchema = z.object({
    enterprise: z.string().min(2, "Mínimo 2 caracteres"),
    ruc: z.string().min(2, "Mínimo 2 caracteres"),
    status: z.string().min(2, "Mínimo 2 caracteres"),
})


export type FormValues = z.infer<typeof formSchema>
