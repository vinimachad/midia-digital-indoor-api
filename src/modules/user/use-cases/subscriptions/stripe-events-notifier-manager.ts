import StripeService from '@configs/stripe'
import { Payment } from '@configs/stripe/types'
import UpdateSubscriptionUseCase from './update-subscription-use-case'
import StripeMapper from './mapper'
import DeleteSubscriptionUseCase from './delete-subscription-use-case'

export interface IStripeEventsNotifierManager {
  execute(config: Payment.StripeEventConfig): Promise<void>
}

export default class StripeEventsNotifierManager implements IStripeEventsNotifierManager {
  constructor(
    private paymentService: Payment.IPaymentService = StripeService.shared,
    private updateSubscriptionUseCase = UpdateSubscriptionUseCase(),
    private deleteSubscriptionUseCase = DeleteSubscriptionUseCase()
  ) {}

  async execute(config: Payment.StripeEventConfig) {
    const event = this.paymentService.notifyWithWebhook(config)
    switch (event.type) {
      case 'checkout.session.completed':
        break
      case 'customer.subscription.created':
        break
      case 'customer.subscription.updated':
        const dto = StripeMapper.parseUpdatedSubscription(event.data.object)
        if (dto) await this.updateSubscriptionUseCase.execute(dto)
        break
      case 'customer.subscription.deleted':
        await this.deleteSubscriptionUseCase.execute(event.data.object.id)
        break
    }
  }
}
