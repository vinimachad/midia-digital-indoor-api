import { Prisma, User } from '@prisma/client'
import UserRepository, {
  IUserRepository
} from '@repositories/user/user-reposiory'

interface ICreateUserUseCase {
  execute(data: Prisma.UserCreateInput)
}

export default class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute(data: Prisma.UserCreateInput) {
    let emailExists = await this.repository.findByEmail(data.email)
    let phoneExists = await this.repository.findByPhone(data.phone_number)

    if (emailExists || phoneExists) throw Error('409')

    try {
      await this.repository.create({
        ...data,
        full_name: data.full_name.toLowerCase()
      })
    } catch (error) {
      throw new Error()
    }
  }
}
