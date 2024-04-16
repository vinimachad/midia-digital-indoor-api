import { IConfigJwt } from '@configs/jwt'
import { Payment } from '@configs/stripe/types'
import AppError from '@shared/middlewares/error/error-model'
import {
  BasicSubscriptionMenuStrategy,
  CommercialMenuContext,
  CommercialUploadStatus,
  MediumOrProSubscriptionMenuStrategy
} from './strategy/commercial-menu'
import { IUserRepository } from '@modules/user/repository'
import { IPaymentRepository } from '@modules/subscription/repository'
import { ICommercialRepository } from '@modules/commercial/repository'

export interface IValidateMenuUseCase {
  execute: (token: string) => Promise<CommercialUpload[]>
}

export type CommercialUpload = {
  index: number
  url: string | null
  title: string
  status: CommercialUploadStatus
  newUploadAvailable: boolean
}

export default class ValidateMenuUseCase implements IValidateMenuUseCase {
  constructor(
    private jwt: IConfigJwt,
    private userRepository: IUserRepository,
    private subscriptionRepository: IPaymentRepository,
    private stripeService: Payment.IPaymentService,
    private commercialRepository: ICommercialRepository
  ) {}

  async execute(token: string) {
    let { id: userId } = this.jwt.accessToken().verify(token)
    let user = await this.userRepository.findById(userId)

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

    let sub = await this.subscriptionRepository.findById(user.subscription_id)
    if (!sub?.product_id) {
      return []
    }

    let menuStrategyContext = new CommercialMenuContext()
    let { name } = await this.stripeService.getProductById(sub?.product_id)

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
    let commercials = await this.commercialRepository.findManyByUserId(userId)
    return menuStrategyContext.executeStrategy(commercials)
  }
}
