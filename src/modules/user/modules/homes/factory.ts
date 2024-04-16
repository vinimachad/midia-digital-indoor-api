import jwt from '@configs/jwt'
import StripeService from '@configs/stripe'
import PaymentRepository from '@modules/subscription/repository'
import UserRepository from '@modules/user/repository'
import controller from './controller'
import ValidateMenuUseCase from './use-cases/validate-menu'
import CommercialRepository from '@modules/commercial/repository'

export default class HomesFactory {
  static controller() {
    return controller({ validateMenuUseCase: this.validateMenuUseCase() })
  }

  static validateMenuUseCase() {
    return new ValidateMenuUseCase(
      jwt(),
      new UserRepository(),
      new PaymentRepository(),
      StripeService.shared,
      new CommercialRepository()
    )
  }
}
