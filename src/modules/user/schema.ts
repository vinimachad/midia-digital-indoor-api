import { z } from 'zod'

const userSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'O campo email é obrigatório' }).email({ message: 'Email inválido' }),
    password: z.string({ required_error: 'O campo senha é obrigatório' }),
    full_name: z.string({
      required_error: 'O campo nome completo é obrigatório'
    }),
    phone_number: z
      .string({ required_error: 'O campo telefone é obrigatório' })
      .length(11, 'O campo número precisa ter 11 digitos')
  })
})

const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Email inválido' }).optional(),
    password: z.string({ required_error: 'O campo senha é obrigatório' }),
    phone_number: z.string().length(11, 'O campo número precisa ter 11 digitos').optional()
  })
})

export { userSchema, userLoginSchema }
