import { IConfigJwt } from '@configs/jwt'
import { Payment } from '@configs/stripe/types'
import AppError from '@middlewares/error/error-model'
import { IPaymentRepository } from '@repositories/payment/payment-repository'
import { IUserRepository } from '@repositories/user/user-reposiory'
import {
  BasicSubscriptionMenuStrategy,
  CommercialMenuContext,
  MediumSubscriptionMenuStrategy,
  ProSubscriptionMenuStrategy
} from './strategy/commercial-menu-strategy'

export interface IHomesModel {
  validateCommercialMenuBySubscription: (token: string) => Promise<CommercialUpload[]>
}

interface HomesModelDTO {
  jwt: IConfigJwt
  userRepository: IUserRepository
  subscriptionRepository: IPaymentRepository
  stripeService: Payment.IPaymentService
}

export enum CommercialUploadStatus {
  ACTIVE = 'ACTIVE',
  TO_UPLOAD = 'TO_UPLOAD',
  BLOCKED = 'BLOCKED',
  PENDING_ANALYSIS = 'PENDING_ANALYSIS'
}

export type CommercialUpload = {
  index: number
  url?: string
  title: string
  status: CommercialUploadStatus
}

export default ({ userRepository, subscriptionRepository, jwt, stripeService }: HomesModelDTO): IHomesModel => {
  async function validateCommercialMenuBySubscription(token: string) {
    let { id: userId } = jwt.accessToken().verify(token)
    let user = await userRepository.findById(userId)

    if (!user) {
      throw new AppError({
        status_code: 400,
        title: 'Usuário não encontrado',
        message: 'Não foi possível encontrar esse usuário, tente novamente!'
      })
    }

    if (!user.subscription_id) {
      return []
    }

    let sub = await subscriptionRepository.findById(user.subscription_id)
    if (!sub?.product_id) {
      return []
    }

    let menuStrategyContext = new CommercialMenuContext()
    let { name } = await stripeService.getProductById(sub?.product_id)

    switch (name) {
      case 'Plano Básico':
        menuStrategyContext.setStrategy(new BasicSubscriptionMenuStrategy())
        break
      case 'Pano Médio':
        menuStrategyContext.setStrategy(new MediumSubscriptionMenuStrategy())
        break
      case 'Plano Pro':
        menuStrategyContext.setStrategy(new ProSubscriptionMenuStrategy())
        break
      default:
        return []
    }

    return menuStrategyContext.executeStrategy([])
  }

  return {
    validateCommercialMenuBySubscription
  }
}
