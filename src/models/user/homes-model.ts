import { IConfigJwt } from '@configs/jwt'
import { Payment } from '@configs/stripe/types'
import AppError from '@middlewares/error/error-model'
import { IPaymentRepository } from '@repositories/payment/payment-repository'
import { IUserRepository } from '@repositories/user/user-reposiory'
import {
  BasicSubscriptionMenuStrategy,
  CommercialMenuContext,
  CommercialUploadStatus,
  MediumOrProSubscriptionMenuStrategy
} from './strategy/commercial-menu-strategy'
import { ICommercialRepository } from '@repositories/commercial/commercial-repository'

export interface IHomesModel {
  validateCommercialMenuBySubscription: (token: string) => Promise<CommercialUpload[]>
}

interface HomesModelDTO {
  jwt: IConfigJwt
  userRepository: IUserRepository
  subscriptionRepository: IPaymentRepository
  stripeService: Payment.IPaymentService
  commercialRepository: ICommercialRepository
}

export type CommercialUpload = {
  index: number
  url: string | null
  title: string
  status: CommercialUploadStatus
  newUploadAvailable: boolean
}

export default ({
  jwt,
  stripeService,
  userRepository,
  commercialRepository,
  subscriptionRepository
}: HomesModelDTO): IHomesModel => {
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
        menuStrategyContext.setStrategy(new MediumOrProSubscriptionMenuStrategy('MEDIUM'))
        break
      case 'Plano Pro':
        menuStrategyContext.setStrategy(new MediumOrProSubscriptionMenuStrategy('PRO'))
        break
      default:
        return []
    }
    let commercials = await commercialRepository.findManyByUserId(userId)
    return menuStrategyContext.executeStrategy(commercials)
  }

  return {
    validateCommercialMenuBySubscription
  }
}
