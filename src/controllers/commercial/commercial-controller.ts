import { Request, Response } from 'express'
import PreProcessImagesUseCase, {
  IPreProcessImagesUseCase
} from '@usecases/pre-process-images/pre-process-images-use-case'

import CreateCommercialListUseCase, {
  ICreateCommercialListUseCase
} from '@usecases/commercial/create-commercial-list-use-case'

export default class CommercialController {
  constructor(
    private preProcessImageUseCase: IPreProcessImagesUseCase = new PreProcessImagesUseCase(),
    private createCommercialListUseCase: ICreateCommercialListUseCase = new CreateCommercialListUseCase()
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
    let results = await this.createCommercialListUseCase.execute()
    res.json({ results })
  }
}
