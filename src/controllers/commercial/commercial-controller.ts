import { Request, Response } from 'express'
import CreateCommercialUseCase, {
  ICreateCommercialUseCase
} from '@usecases/commercial/create-commercial-use-case'
import PreProcessImagesUseCase, {
  IPreProcessImagesUseCase
} from '@usecases/pre-process-images/pre-process-images-use-case'
import GetTourismRssUseCase, {
  IGetTourismRssUseCase
} from '@usecases/rss/get-turismo-rss-use-case'

export default class CommercialController {
  constructor(
    private preProcessImageUseCase: IPreProcessImagesUseCase = new PreProcessImagesUseCase(),
    private createCommercialUseCase: ICreateCommercialUseCase = new CreateCommercialUseCase(),
    private getTourismRssUseCase: IGetTourismRssUseCase = new GetTourismRssUseCase()
  ) {}

  async create(req: Request, res: Response) {
    let request = {
      file: req.file,
      time_seconds: req.body.time_seconds
    }

    await this.preProcessImageUseCase.execute(req.file)
    res.json({ message: 'ok' })
  }

  async list(req: Request, res: Response) {
    let results = await this.getTourismRssUseCase.execute()
    res.json({ results })
  }
}
