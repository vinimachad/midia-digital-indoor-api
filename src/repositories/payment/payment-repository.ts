import { Prisma, Subscription } from '@prisma/client'
import BaseRepository from '@repositories/abstract-repository'

export interface IPaymentRepository {
  list(): Promise<[Subscription]>
  deleteById(id: string): Promise<void>
  findById(id: string): Promise<Subscription | null>
  create(data: Prisma.SubscriptionCreateInput): Promise<Subscription>
  findByCustomerId(id: string): Promise<Subscription | null>
  findManyByUserEmail(email: string): Promise<Subscription[]>
  update(id: string, data: Prisma.SubscriptionUpdateInput): Promise<void>
}

export default class PaymentRepository
  extends BaseRepository<Prisma.SubscriptionCreateInput>
  implements IPaymentRepository
{
  constructor() {
    super('Subscription')
  }

  async update(id: string, data: Prisma.SubscriptionUpdateInput) {
    await this.client.subscription.update({ data, where: { id } })
  }

  async findByCustomerId(id: string) {
    return await this.client.subscription.findUnique({ where: { customer_id: id } })
  }

  async findManyByUserEmail(email: string) {
    return await this.client.subscription.findMany({
      where: { user: { email } }
    })
  }
}
