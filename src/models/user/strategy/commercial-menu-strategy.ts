import { CommercialStatus, Prisma, Commercial as PrismaCommercial } from '@prisma/client'
import { CommercialUpload } from '../homes-model'

type UploadedCommercial = PrismaCommercial

export interface ICommercialMenuStrategy {
  createMenu(uploadedCommercials: UploadedCommercial[]): CommercialUpload[]
}

export class CommercialMenuContext {
  private strategy: ICommercialMenuStrategy | undefined

  setStrategy(strategy: ICommercialMenuStrategy) {
    this.strategy = strategy
  }

  executeStrategy(uploadedCommercials: UploadedCommercial[]) {
    if (!this.strategy) {
      return []
    }

    return this.strategy?.createMenu(uploadedCommercials)
  }
}

type Commercial = { status: CommercialUploadStatus; url: string | null }

export enum CommercialUploadStatus {
  ACTIVE = 'ACTIVE',
  TO_UPLOAD = 'TO_UPLOAD',
  BLOCKED = 'BLOCKED',
  PENDING_ANALYSIS = 'PENDING_ANALYSIS'
}

const dropOrClick = 'Arraste e solte ou clique para adicionar uma propaganda'
const updatePlan = 'Para adicionar uma nova propaganda  é preciso atualizar o seu plano'
const commercialStatusMapping: Record<CommercialStatus, CommercialUploadStatus> = {
  ACTIVE: CommercialUploadStatus.ACTIVE,
  PENDING_ANALYSIS: CommercialUploadStatus.PENDING_ANALYSIS
}

export class BasicSubscriptionMenuStrategy implements ICommercialMenuStrategy {
  createMenu(uploadedCommercials: UploadedCommercial[]): CommercialUpload[] {
    let commercial: Commercial = {
      status: CommercialUploadStatus.TO_UPLOAD,
      url: null
    }

    if (uploadedCommercials.length > 0) {
      const { status, url } = uploadedCommercials[0]
      if (status in commercialStatusMapping) {
        commercial.status = commercialStatusMapping[status]
        commercial.url = url
      }
    }

    return [
      {
        index: 0,
        title: dropOrClick,
        ...commercial
      },
      {
        index: 1,
        url: null,
        title: updatePlan,
        status: CommercialUploadStatus.BLOCKED
      },
      {
        index: 2,
        url: null,
        title: updatePlan,
        status: CommercialUploadStatus.BLOCKED
      }
    ]
  }
}

export class MediumOrProSubscriptionMenuStrategy implements ICommercialMenuStrategy {
  constructor(private plan: 'PRO' | 'MEDIUM') {}

  createMenu(uploadedCommercials: UploadedCommercial[]): CommercialUpload[] {
    let commercials: Commercial[] = []

    if (uploadedCommercials.length > 0) {
      for (let { status, url } of uploadedCommercials) {
        let commercial: Commercial = { status: CommercialUploadStatus.TO_UPLOAD, url: null }

        if (status in commercialStatusMapping) {
          commercial.status = commercialStatusMapping[status]
          commercial.url = url
        }
        commercials.push(commercial)
      }
    }

    return [
      {
        index: 0,
        title: dropOrClick,
        ...commercials[0]
      },
      {
        index: 1,
        title: dropOrClick,
        ...commercials[1]
      },
      this.plan === 'PRO'
        ? {
            index: 2,
            url: null,
            title: updatePlan,
            status: CommercialUploadStatus.BLOCKED
          }
        : {
            index: 2,
            title: dropOrClick,
            ...commercials[2]
          }
    ]
  }
}
