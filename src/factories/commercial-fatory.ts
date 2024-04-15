import commercialModel from '@models/commercial/commercial-model'

export default class CommercialFactory {
  static model() {
    return commercialModel({})
  }
}
