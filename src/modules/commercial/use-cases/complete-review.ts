import { CommercialStatus } from '@prisma/client'
import { ICommercialRepository } from '../repository'

export interface ICompleteReviewUseCase {
  execute(data: CompleteReviewDTO): Promise<void>
}

export enum ReviewStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING'
}

type Rejected = {
  message: string
}

type CompleteReviewDTO = {
  commercial_id: string
  status: ReviewStatus
  rejected?: Rejected
}

const reviewStatusMapper: Record<ReviewStatus, CommercialStatus> = {
  APPROVED: CommercialStatus.ACTIVE,
  REJECTED: CommercialStatus.REJECTED,
  PENDING: CommercialStatus.PENDING_ANALYSIS
}

export default class CompleteReviewUseCase {
  constructor(private commercialRepository: ICommercialRepository) {}

  async execute(data: CompleteReviewDTO) {
    await this.commercialRepository.update(data.commercial_id, { status: reviewStatusMapper[data.status] })
  }
}
