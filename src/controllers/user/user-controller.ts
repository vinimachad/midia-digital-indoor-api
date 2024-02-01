import CreateUserUseCase, {
  ICreateUserUseCase
} from '@usecases/user/create-user-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export default function UserController(
  createUserUseCase: ICreateUserUseCase = new CreateUserUseCase()
) {
  async function create(req: Request, res: Response) {
    let user = z.object({
      email: z.string().email(),
      password: z.string(),
      full_name: z.string(),
      phone_number: z.string()
    })

    await createUserUseCase.execute(user.parse(req.body))
    res.status(204)
  }

  return { create }
}
