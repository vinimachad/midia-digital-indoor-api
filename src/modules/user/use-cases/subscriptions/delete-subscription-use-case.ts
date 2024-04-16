import PaymentRepository, { IPaymentRepository } from '@modules/subscription/repository'

export default function DeleteSubscriptionUseCase(repository: IPaymentRepository = new PaymentRepository()) {
  async function execute(id: string) {
    await repository.deleteById(id)
  }

  return { execute }
}
