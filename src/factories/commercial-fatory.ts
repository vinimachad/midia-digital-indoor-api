import AWSManager from '@configs/aws'
import commercialModel from '@models/commercial/commercial-model'
import CommercialRepository from '@repositories/commercial/commercial-repository'

export default class CommercialFactory {
  static model() {
    return commercialModel({
      aws: new AWSManager(),
      commercialRepository: new CommercialRepository()
    })
  }
}
