import crypt from 'bcrypt'
import { Prisma } from '@prisma/client'
import UserRepository, {
  IUserRepository
} from '@repositories/user/user-reposiory'
import AppError from '@middlewares/error/error-model'
import jwt from 'jsonwebtoken'

export interface ICreateUserUseCase {
  execute(data: Prisma.UserCreateInput)
}

export default class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private repository: IUserRepository = new UserRepository()) {}

  async execute(data: Prisma.UserCreateInput) {
    let emailExists = await this.repository.findByEmail(data.email)
    let phoneExists = await this.repository.findByPhone(data.phone_number)

    this.validateEmailAndPhone(emailExists != null, phoneExists != null)

    try {
      let { id, email, full_name, phone_number } = await this.repository.create(
        {
          ...data,
          password: await this.encodePassword(data.password),
          full_name: data.full_name.toLowerCase()
        }
      )

      return {
        email,
        full_name,
        phone_number,
        token_jwt: this.signInJwt(id)
      }
    } catch (error) {
      throw new AppError({
        status_code: 422,
        title: 'Problema ao criar usuario na base de dados'
      })
    }
  }

  private async encodePassword(password: string): Promise<string> {
    return await crypt.hash(password, 8)
  }

  private validateEmailAndPhone(emailExists: boolean, phoneExists: boolean) {
    if (emailExists || phoneExists) {
      let message = ''
      if (emailExists && phoneExists) {
        message = 'Email e telefone já existem.'
      } else if (emailExists) {
        message = 'Email já existe.'
      } else if (phoneExists) {
        message = 'Telefone já existe'
      }

      throw new AppError({
        status_code: 409,
        title: 'Credenciais inválidas',
        message: message
      })
    }
  }

  private signInJwt(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY ?? '', { expiresIn: 30 })
  }
}
