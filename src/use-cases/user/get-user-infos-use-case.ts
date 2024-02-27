import jwt from '@configs/jwt'
import AppError from '@middlewares/error/error-model'
import { User } from '@prisma/client'
import UserRepository, { IUserRepository } from '@repositories/user/user-reposiory'

type UserInfo = Omit<User, 'password' | 'subscription_id'>

export interface IGetUserInfosUseCase {
  execute(access_token: string): Promise<UserInfo>
}

export default class GetUserInfosUseCase implements IGetUserInfosUseCase {
  constructor(private userRepository: IUserRepository = new UserRepository()) {}

  async execute(access_token: string): Promise<UserInfo> {
    const { id } = jwt().accessToken().verify(access_token)
    const user: User | null = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError({
        status_code: 422,
        title: 'Usuário não encontrado',
        message: 'Usuário não foi encontrado na nossa base de dadods'
      })
    }

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone_number: user.phone_number
    }
  }
}
