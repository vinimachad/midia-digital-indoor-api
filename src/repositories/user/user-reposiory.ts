import { Prisma, User } from '@prisma/client'
import BaseRepository from '@repositories/abstract-repository'

export interface IUserRepository extends BaseRepository<Prisma.UserCreateInput, User> {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
}

export default class UserRepository extends BaseRepository<Prisma.UserCreateInput, User> implements IUserRepository {
  model: any

  constructor() {
    super()
    this.model = this.client.user
  }

  async findByEmail(email: string) {
    return await this.client.user.findUnique({ where: { email } })
  }

  async findByPhone(phone_number: string) {
    return await this.client.user.findUnique({ where: { phone_number } })
  }
}
