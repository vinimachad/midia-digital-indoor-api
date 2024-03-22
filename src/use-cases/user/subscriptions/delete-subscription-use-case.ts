import PaymentRepository, { IPaymentRepository } from '@repositories/payment/payment-repository'

export default function DeleteSubscriptionUseCase(repository: IPaymentRepository = new PaymentRepository()) {
  async function execute(id: string) {
    await repository.deleteById(id)
  }

  return { execute }
}
