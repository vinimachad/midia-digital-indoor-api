import AWSManager from '@configs/aws'
import CommercialController from './controller'
import CreateBannersUseCase from './modules/banner/use-cases/create-banner'
import CommercialRepository from './repository'
import CreateCommercialListUseCase from './use-cases/create-commercial-list'
import CreateReviewUseCase from './use-cases/create-review'
import ListCommercialsUseCase from './use-cases/list-commercials'
import CompleteReviewUseCase from './use-cases/complete-review'

export default class CommercialFactory {
  static controller() {
    const awsManager = new AWSManager()
    const commercialRepository = new CommercialRepository()

    return new CommercialController(
      new CreateBannersUseCase(),
      new CreateCommercialListUseCase(),
      new ListCommercialsUseCase(),
      new CreateReviewUseCase(awsManager, commercialRepository),
      new CompleteReviewUseCase(commercialRepository)
    )
  }
}
