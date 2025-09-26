// fields.ts
import { z } from "zod"

export const formSchema = z.object({
    ruc: z.string().min(2, "Mínimo 2 caracteres"),
    razon_social: z.string().min(2, "Mínimo 2 caracteres"),
    direccion: z.string().min(2, "Mínimo 2 caracteres"),
    telefono: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("Formato de correo inválido"),
})


export type FormValues = z.infer<typeof formSchema>
