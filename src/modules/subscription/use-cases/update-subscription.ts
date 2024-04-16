import StripeService from '@configs/stripe'
import { Payment } from '@configs/stripe/types'
import { SubscriptionStatus } from '@prisma/client'
import PaymentRepository, { IPaymentRepository } from '../repository'
import AppError from '@shared/middlewares/error/error-model'

export type UpdateSubscriptionDTO = {
  id: string
  customer_id: string
  plan_id: string
  value: number
  status: SubscriptionStatus
  cancel_at?: number
  canceled_at?: number
  current_period_end: number
  current_period_start: number
  product_id: string
}

export default function UpdateSubscriptionUseCase(
  repository: IPaymentRepository = new PaymentRepository(),
  stripeService: Payment.IPaymentService = StripeService.shared
) {
  async function execute(data: UpdateSubscriptionDTO) {
    let subscription = await repository.findByCustomerId(data.customer_id)
    if (subscription) {
      await repository.update(subscription.id, data)
      return
    }

    let customer = await stripeService.getCustomerById(data.customer_id)
    if (!customer || !customer.email) {
      throw new AppError({
        status_code: 400,
        title: 'Não foi encontrado seu usuário na assinatura'
      })
    }

    try {
      await repository.create({
        id: data.id,
        value: data.value,
        status: data.status,
        plan_id: data.plan_id,
        cancel_at: data.cancel_at,
        product_id: data.product_id,
        canceled_at: data.canceled_at,
        customer_id: data.customer_id,
        current_period_end: data.current_period_end,
        current_period_start: data.current_period_start,
        user: { connect: { email: customer.email } }
      })
    } catch (error) {
      throw new AppError({
        status_code: 400,
        title: 'Ocorreu um erro ao tentar criar uma assinatura'
      })
    }
  }

  return { execute }
}
