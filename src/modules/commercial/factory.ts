import AWSManager from '@configs/aws'
import CommercialController from './controller'
import CreateBannersUseCase from './modules/banner/use-cases/create-banner'
import CommercialRepository from './repository'
import CreateCommercialListUseCase from './use-cases/create-commercial-list'
import CreateReviewUseCase from './use-cases/create-review'
import ListCommercialsUseCase from './use-cases/list-commercials'

export default class CommercialFactory {
  static controller() {
    return new CommercialController(
      new CreateBannersUseCase(),
      new CreateCommercialListUseCase(),
      new ListCommercialsUseCase(),
      this.createReviewUseCase()
    )
  }

  static createReviewUseCase() {
    return new CreateReviewUseCase(new AWSManager(), new CommercialRepository())
  }
}
