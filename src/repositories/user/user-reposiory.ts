import { Prisma, User } from '@prisma/client'
import BaseRepository from '@repositories/abstract-repository'

export interface IUserRepository
  extends BaseRepository<Prisma.UserCreateInput> {
  findByEmail(email: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
}

export default class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super('User')
  }

  async findByEmail(email: string) {
    return await this.client.user.findUnique({ where: { email } })
  }

  async findByPhone(phone_number: string) {
    return await this.client.user.findUnique({ where: { phone_number } })
  }
}
