import { z } from 'zod'

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Email inválido' }).optional(),
    password: z.string({ required_error: 'O campo senha é obrigatório' }),
    phone_number: z
      .string()
      .length(11, 'O campo número precisa ter 11 digitos')
      .optional()
  })
})
