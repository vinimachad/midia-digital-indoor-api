import jwt from '@configs/jwt'
import StripeService from '@configs/stripe'
import homesController from '@controllers/user/homes-controller'
import homesModel from '@models/user/homes-model'
import CommercialRepository from '@repositories/commercial/commercial-repository'
import PaymentRepository from '@repositories/payment/payment-repository'
import UserRepository from '@repositories/user/user-reposiory'

export default class HomesFactory {
  static controller() {
    const model = homesModel({
      jwt: jwt(),
      stripeService: StripeService.shared,
      userRepository: new UserRepository(),
      subscriptionRepository: new PaymentRepository(),
      commercialRepository: new CommercialRepository()
    })
    return homesController({ homesModel: model })
  }
}
