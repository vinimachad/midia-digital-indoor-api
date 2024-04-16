import { Request, Response } from 'express'
import { ICreateUserUseCase } from './use-cases/create-user'
import { ILoginUserUseCaseTsUseCase } from './use-cases/user-login'
import { IGetUserInfosUseCase } from './use-cases/get-user-infos'
import { userLoginSchema, userSchema } from './schema'

export default function UserController(
  createUserUseCase: ICreateUserUseCase,
  loginUserUseCaseTsUseCase: ILoginUserUseCaseTsUseCase,
  getUserInfosUseCase: IGetUserInfosUseCase
) {
  async function create(req: Request, res: Response) {
    let user = userSchema.parse(req).body
    let results = await createUserUseCase.execute(user)

    res.status(200).json({ results })
  }

  async function login(req: Request, res: Response) {
    let results = await loginUserUseCaseTsUseCase.execute(userLoginSchema.parse(req).body)

    res.status(200).json({ results })
  }

  async function infos(req: Request, res: Response) {
    let [_, access_token] = req.headers.authorization?.split(' ') ?? ''
    let results = await getUserInfosUseCase.execute(access_token)
    res.status(200).json({ results })
  }

  return { create, login, infos }
}
