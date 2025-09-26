import { z } from "zod"

export function getDefaults<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
): z.infer<typeof schema> {
  const shape = schema.shape
  const defaults: Record<string, any> = {}

  for (const key in shape) {
    const def = (shape[key] as any)._def

    if (def.defaultValue !== undefined) {
      // Campo con .default()
      defaults[key] = def.defaultValue()
    } else if (def.type?._def?.defaultValue !== undefined) {
      // Caso anidado (ej. z.string().default(...).optional())
      defaults[key] = def.type._def.defaultValue()
    } else if (def.type instanceof z.ZodObject) {
      // Caso objeto anidado
      defaults[key] = getDefaults(def.type)
    } else {
      // Si no hay default, ponemos algo "neutro"
      switch (def.typeName) {
        case "ZodString":
          defaults[key] = ""
          break
        case "ZodNumber":
          defaults[key] = 0
          break
        case "ZodBoolean":
          defaults[key] = false
          break
        case "ZodArray":
          defaults[key] = []
          break
        case "ZodObject":
          defaults[key] = {}
          break
        default:
          defaults[key] = undefined
      }
    }
  }

  return defaults as z.infer<typeof schema>
}
