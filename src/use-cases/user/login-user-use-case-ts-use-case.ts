import crypt from 'bcrypt'
import AppError from '@middlewares/error/error-model'
import { User } from '@prisma/client'
import UserRepository, {
  IUserRepository
} from '@repositories/user/user-reposiory'
import jwt from '@configs/jwt'

type Request = { password: string; email?: string; phone_number?: string }

export interface ILoginUserUseCaseTsUseCase {
  execute(data: Request)
}

export default class LoginUserUseCaseTsUseCase
  implements ILoginUserUseCaseTsUseCase
{
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute(data: Request) {
    if (!data.email && !data.phone_number) {
      throw new AppError({
        status_code: 409,
        title: 'Email ou número de telefone são obrigatórios'
      })
    }

    var user: User | null = null
    if (data.email) user = await this.repository.findByEmail(data.email)
    if (data.phone_number)
      user = await this.repository.findByPhone(data.phone_number)

    if (!user)
      throw new AppError({
        status_code: 404,
        title: 'Usuário não encontrado',
        message:
          'Não foi possível encontrar nenhum usuário com esse email ou telefone.'
      })

    await this.tryComparePassword(data.password, user.password)
    let token_jwt = jwt().jwtToken().sign(user.id)
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      token_jwt
    }
  }

  private async tryComparePassword(password: string, user_password: string) {
    let isSamePassword = await crypt.compare(password, user_password)
    if (!isSamePassword) {
      throw new AppError({
        status_code: 404,
        title: 'Email ou senha incorretos.',
        message: 'Parece que o email ou senha digitado está incorreto.'
      })
    }
  }
}
