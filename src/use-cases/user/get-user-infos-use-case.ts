import { unixToDate } from '@configs/extensions/number'
import jwt from '@configs/jwt'
import AppError from '@middlewares/error/error-model'
import { Subscription, User } from '@prisma/client'
import PaymentRepository, { IPaymentRepository } from '@repositories/payment/payment-repository'
import UserRepository, { IUserRepository } from '@repositories/user/user-reposiory'

type UserInfo = Omit<User, 'password' | 'subscription_id'> & { subscription: SubscriptionInfo }
type SubscriptionInfo = {
  status: string
  value?: number
  plan_type?: string
  period_end?: Date
  period_start?: Date
}

export interface IGetUserInfosUseCase {
  execute(access_token: string): Promise<UserInfo>
}

export default class GetUserInfosUseCase implements IGetUserInfosUseCase {
  constructor(
    private userRepository: IUserRepository = new UserRepository(),
    private paymentRepository: IPaymentRepository = new PaymentRepository()
  ) {}

  async execute(access_token: string): Promise<UserInfo> {
    var subscription: Subscription | null = null
    const { id } = jwt().accessToken().verify(access_token)
    const user: User | null = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError({
        status_code: 422,
        title: 'Usuário não encontrado',
        message: 'Usuário não foi encontrado na nossa base de dadods'
      })
    }

    if (user.subscription_id) {
      subscription = await this.paymentRepository.findById(user.subscription_id)
    }

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone_number: user.phone_number,
      subscription: subscription
        ? {
            status: 'ACTIVE',
            period_end: unixToDate(Number(subscription.current_period_end)),
            period_start: unixToDate(Number(subscription.current_period_start)),
            plan_type: this.getPlanTypeByPrice(subscription.value.toNumber()),
            value: subscription.value.toNumber()
          }
        : { status: 'DISABLED' }
    }
  }

  private getPlanTypeByPrice(price: number) {
    switch (price) {
      case 1000:
        return 'BASIC'
      case 1700:
        return 'MEDIUM'
      case 2000:
        return 'PRO'
    }
  }
}
