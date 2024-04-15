import { CommercialAnalysis } from '@type/commercial'

export interface ICommercialModel {
  createCommercialAnalysis(data: CommercialAnalysis.Request): Promise<void>
}

export type CommercialModelDTO = {}

export default ({}: CommercialModelDTO): ICommercialModel => {
  async function createCommercialAnalysis(data: CommercialAnalysis.Request) {}

  return {
    createCommercialAnalysis
  }
}
