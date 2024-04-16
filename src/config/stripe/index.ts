import Stripe from 'stripe'
import { Payment } from './types'
import AppError from '@shared/middlewares/error/error-model'

export const stripeKeys = {
  apiKey: process.env.STRIPE_API_KEY ?? '',
  secretEndpoint: process.env.STRIPE_SECRET_ENDPOINT_KEY ?? ''
}

export default class StripeService implements Payment.IPaymentService {
  public static shared: Payment.IPaymentService = new StripeService()
  private stripe: Stripe

  private constructor() {
    this.stripe = new Stripe(stripeKeys.apiKey)
  }

  notifyWithWebhook(config: Payment.StripeEventConfig): Stripe.Event {
    return this.constructEvent(config)
  }

  async getCustomerById(id: string) {
    let customer = await this.stripe.customers.retrieve(id)
    if (Payment.isCustomer(customer)) {
      return customer
    }
  }

  async getProductById(id: string) {
    return await this.stripe.products.retrieve(id)
  }

  private constructEvent(config: Payment.StripeEventConfig) {
    try {
      return this.stripe.webhooks.constructEvent(config.body, config.sig, stripeKeys.secretEndpoint)
    } catch (err) {
      let error = err as { message: string }
      throw new AppError({
        status_code: 400,
        title: 'Webhook error',
        message: error.message ?? ''
      })
    }
  }
}
