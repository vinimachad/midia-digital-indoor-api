import { Commercial as PrismaCommercial } from '@prisma/client'
import { CommercialUpload, CommercialUploadStatus } from '../homes-model'

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

const dropOrClick = 'Arraste e solte ou clique para adicionar uma propaganda'
const updatePlan = 'Para adicionar uma nova propaganda  é preciso atualizar o seu plano'
type Commercial = { status: CommercialUploadStatus; url: string | null }

export class BasicSubscriptionMenuStrategy implements ICommercialMenuStrategy {
  createMenu(uploadedCommercials: UploadedCommercial[]): CommercialUpload[] {
    let commercial: Commercial = {
      status: CommercialUploadStatus.TO_UPLOAD,
      url: null
    }

    if (uploadedCommercials.length > 0) {
      const firstCommercial = uploadedCommercials[0]
      switch (firstCommercial.status) {
        case 'ACTIVE':
          commercial.status = CommercialUploadStatus.ACTIVE
          commercial.url = firstCommercial.url
          break
        case 'PENDING_ANALYSIS':
          commercial.status = CommercialUploadStatus.PENDING_ANALYSIS
          commercial.url = firstCommercial.url
          break
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

export class MediumSubscriptionMenuStrategy implements ICommercialMenuStrategy {
  createMenu(uploadedCommercials: UploadedCommercial[]): CommercialUpload[] {
    let commercials: Commercial[] = []
    if (uploadedCommercials.length > 0) {
      for (let uploadedCommercial of uploadedCommercials) {
        let commercial: Commercial = { status: CommercialUploadStatus.TO_UPLOAD, url: null }
        switch (uploadedCommercial.status) {
          case 'ACTIVE':
            commercial.status = CommercialUploadStatus.ACTIVE
            commercial.url = uploadedCommercial.url
            break
          case 'PENDING_ANALYSIS':
            commercial.status = CommercialUploadStatus.PENDING_ANALYSIS
            commercial.url = uploadedCommercial.url
            break
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
      {
        index: 2,
        url: null,
        title: updatePlan,
        status: CommercialUploadStatus.BLOCKED
      }
    ]
  }
}

export class ProSubscriptionMenuStrategy implements ICommercialMenuStrategy {
  createMenu(uploadedCommercials: UploadedCommercial[]): CommercialUpload[] {
    let commercials: Commercial[] = []
    if (uploadedCommercials.length > 0) {
      for (let uploadedCommercial of uploadedCommercials) {
        let commercial: Commercial = { status: CommercialUploadStatus.TO_UPLOAD, url: null }
        switch (uploadedCommercial.status) {
          case 'ACTIVE':
            commercial.status = CommercialUploadStatus.ACTIVE
            commercial.url = uploadedCommercial.url
            break
          case 'PENDING_ANALYSIS':
            commercial.status = CommercialUploadStatus.PENDING_ANALYSIS
            commercial.url = uploadedCommercial.url
            break
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
      {
        index: 2,
        title: dropOrClick,
        ...commercials[2]
      }
    ]
  }
}
