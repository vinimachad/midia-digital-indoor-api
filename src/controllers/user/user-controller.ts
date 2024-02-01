import { userSchema } from '@models/zod/schemas/user'
import { userLoginSchema } from '@models/zod/schemas/user-login'
import CreateUserUseCase, {
  ICreateUserUseCase
} from '@usecases/user/create-user-use-case'
import LoginUserUseCaseTsUseCase, {
  ILoginUserUseCaseTsUseCase
} from '@usecases/user/login-user-use-case-ts-use-case'
import CanRefreshTokenUseCaseUseCase, {
  ICanRefreshTokenUseCaseUseCase
} from '@usecases/user/refresh-token/can-refresh-token-use-case-use-case'
import { Request, Response } from 'express'

export default function UserController(
  createUserUseCase: ICreateUserUseCase = new CreateUserUseCase(),
  loginUserUseCaseTsUseCase: ILoginUserUseCaseTsUseCase = new LoginUserUseCaseTsUseCase(),
  canRefreshTokenUseCaseUseCase: ICanRefreshTokenUseCaseUseCase = new CanRefreshTokenUseCaseUseCase()
) {
  async function create(req: Request, res: Response) {
    let user = userSchema.parse(req).body
    let results = await createUserUseCase.execute(user)
    res.status(200).json({ results })
  }

  async function refreshToken(req: Request, res: Response) {
    let auth = req.headers.authorization ?? ''
    let [_, token] = auth.split(' ')
    let results = await canRefreshTokenUseCaseUseCase.execute(token)
    res.status(200).json({ results })
  }

  async function login(req: Request, res: Response) {
    let results = await loginUserUseCaseTsUseCase.execute(
      userLoginSchema.parse(req).body
    )
    res.status(200).json({ results })
  }

  return { create, refreshToken, login }
}
