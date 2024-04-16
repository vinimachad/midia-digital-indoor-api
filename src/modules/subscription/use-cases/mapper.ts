import Stripe from 'stripe'
import { SubscriptionStatus } from '@prisma/client'
import { UpdateSubscriptionDTO } from './update-subscription'

export default class StripeMapper {
  static parseUpdatedSubscription(data: Stripe.Subscription): UpdateSubscriptionDTO | undefined {
    if (data.items.data.length < 0) return
    let price = data.items.data[0].price
    let productId = price.product as string
    let status = data.status == 'active' ? SubscriptionStatus.ACTIVE : SubscriptionStatus.CANCELED
    return {
      id: data.id,
      status,
      value: price.unit_amount ?? 0,
      plan_id: price.id,
      product_id: productId,
      cancel_at: data.cancel_at ?? undefined,
      canceled_at: data.canceled_at ?? undefined,
      customer_id: data.customer as string,
      current_period_end: data.current_period_end,
      current_period_start: data.current_period_start
    }
  }
}
