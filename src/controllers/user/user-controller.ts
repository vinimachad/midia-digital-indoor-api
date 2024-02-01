import { userSchema } from '@models/zod/schemas/user'
import CreateUserUseCase, {
  ICreateUserUseCase
} from '@usecases/user/create-user-use-case'
import { Request, Response } from 'express'

export default function UserController(
  createUserUseCase: ICreateUserUseCase = new CreateUserUseCase()
) {
  async function create(req: Request, res: Response) {
    let user = userSchema.parse(req).body
    let results = await createUserUseCase.execute(user)
    res.status(200).json({ results })
  }

  return { create }
}
