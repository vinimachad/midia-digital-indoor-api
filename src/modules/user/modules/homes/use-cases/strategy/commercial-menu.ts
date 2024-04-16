import { CommercialStatus, Commercial as PrismaCommercial } from '@prisma/client'
import { differenceDatesInDays } from '@shared/utils/date'
import { CommercialUpload } from '../validate-menu'

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

type Commercial = { status: CommercialUploadStatus; url: string | null; newUploadAvailable: boolean }

export enum CommercialUploadStatus {
  ACTIVE = 'ACTIVE',
  TO_UPLOAD = 'TO_UPLOAD',
  BLOCKED = 'BLOCKED',
  PENDING_ANALYSIS = 'PENDING_ANALYSIS'
}

const dropOrClick = 'Arraste e solte ou clique para adicionar uma propaganda'
const updatePlan = 'Para adicionar uma nova propaganda  é preciso atualizar o seu plano'
const minDifferenceDaysToNewUpload = 20
const commercialStatusMapping: Record<CommercialStatus, CommercialUploadStatus> = {
  ACTIVE: CommercialUploadStatus.ACTIVE,
  PENDING_ANALYSIS: CommercialUploadStatus.PENDING_ANALYSIS
}

export class BasicSubscriptionMenuStrategy implements ICommercialMenuStrategy {
  createMenu(uploadedCommercials: UploadedCommercial[]): CommercialUpload[] {
    let commercial: Commercial = {
      status: CommercialUploadStatus.TO_UPLOAD,
      newUploadAvailable: true,
      url: null
    }

    if (uploadedCommercials.length > 0) {
      const { status, url, created_at } = uploadedCommercials[0]
      if (status in commercialStatusMapping) {
        const differenceInDays = differenceDatesInDays(new Date(), created_at)
        commercial.status = commercialStatusMapping[status]
        commercial.url = url
        commercial.newUploadAvailable = differenceInDays >= minDifferenceDaysToNewUpload
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
        newUploadAvailable: false,
        status: CommercialUploadStatus.BLOCKED
      },
      {
        index: 2,
        url: null,
        title: updatePlan,
        newUploadAvailable: false,
        status: CommercialUploadStatus.BLOCKED
      }
    ]
  }
}

export class MediumOrProSubscriptionMenuStrategy implements ICommercialMenuStrategy {
  private commercials: Commercial[]

  constructor(private plan: 'PRO' | 'MEDIUM') {
    this.commercials = [this.createDefaultCommercial(), this.createDefaultCommercial()]
    if (plan === 'PRO') this.commercials.push(this.createDefaultCommercial())
  }

  private createDefaultCommercial() {
    return { status: CommercialUploadStatus.TO_UPLOAD, url: null, newUploadAvailable: true }
  }

  public createMenu(uploadedCommercials: UploadedCommercial[]): CommercialUpload[] {
    if (uploadedCommercials.length > 0) {
      for (let { status, url, created_at, index } of uploadedCommercials) {
        let commercial: Commercial = this.createDefaultCommercial()

        if (status in commercialStatusMapping) {
          const differenceInDays = differenceDatesInDays(new Date(), created_at)
          commercial.status = commercialStatusMapping[status]
          commercial.url = url
          commercial.newUploadAvailable = differenceInDays >= minDifferenceDaysToNewUpload
        }
        this.commercials[index] = commercial
      }
    }

    return [
      {
        index: 0,
        title: dropOrClick,
        ...this.commercials[0]
      },
      {
        index: 1,
        title: dropOrClick,
        ...this.commercials[1]
      },
      this.plan === 'MEDIUM'
        ? {
            index: 2,
            url: null,
            title: updatePlan,
            newUploadAvailable: false,
            status: CommercialUploadStatus.BLOCKED
          }
        : {
            index: 2,
            title: dropOrClick,
            ...this.commercials[2]
          }
    ]
  }
}
