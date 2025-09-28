// fields.ts
import { z } from "zod"

export const formSchema = z.object({
    ruc: z.string().min(2, "Mínimo 2 caracteres"),
    razon_social: z.string().min(2, "Mínimo 2 caracteres"),
    direccion: z.string().min(2, "Mínimo 2 caracteres").optional().nullable(),
    telefono: z.string().min(2, "Mínimo 2 caracteres").optional().nullable(),
    email: z.string().email("Formato de correo inválido").optional().nullable(),
})


export type FormValues = z.infer<typeof formSchema>
