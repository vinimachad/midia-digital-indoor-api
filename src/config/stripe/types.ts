import Stripe from 'stripe'

export namespace Payment {
  export interface IPaymentService {
    notifyWithWebhook(config: StripeEventConfig): Stripe.Event
    getCustomerById(id: string): Promise<StripeCustomer | undefined>
  }

  export type StripeEventConfig = { body: any; sig: string }
  export type StripeCustomer = Stripe.Response<Stripe.Customer>

  export function isCustomer(data: any): data is StripeCustomer {
    return 'email' in data
  }
}
