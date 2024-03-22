import { z } from 'zod'

export const userSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'O campo email é obrigatório' })
      .email({ message: 'Email inválido' }),
    password: z.string({ required_error: 'O campo senha é obrigatório' }),
    full_name: z.string({
      required_error: 'O campo nome completo é obrigatório'
    }),
    phone_number: z
      .string({ required_error: 'O campo telefone é obrigatório' })
      .length(11, 'O campo número precisa ter 11 digitos')
  })
})
