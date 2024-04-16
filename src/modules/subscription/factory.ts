import StripeController from './controller'
import StripeEventsNotifierManager from './use-cases/stripe-events'

export default class SubscriptionFactory {
  static controller() {
    return StripeController(new StripeEventsNotifierManager())
  }
}
