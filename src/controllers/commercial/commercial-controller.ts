import { Request, Response } from 'express'
import CreateCommercialListUseCase, {
  ICreateCommercialListUseCase
} from '@usecases/commercial/create-commercial-list-use-case'
import ListCommercialsUseCase, { IListCommercialsUseCase } from '@usecases/commercial/list-commercials-use-case'
import CreateBannersUseCase, { ICreateBannersUseCase } from '@usecases/commercial/banner/create-banner-use-case'

export default class CommercialController {
  constructor(
    private createBannersUseCase: ICreateBannersUseCase = new CreateBannersUseCase(),
    private createCommercialListUseCase: ICreateCommercialListUseCase = new CreateCommercialListUseCase(),
    private listCommercialsUseCase: IListCommercialsUseCase = new ListCommercialsUseCase()
  ) {}

  async create(req: Request, res: Response) {
    await this.createBannersUseCase.execute(req.files?.files)
    res.json({ message: 'ok' })
  }

  async list(req: Request, res: Response) {
    let page = Number(req.query.page)
    let limit = Number(req.query.limit)

    let results = await this.listCommercialsUseCase.execute(page, limit)
    res.status(200).json({ results })
  }

  async update(req: Request, res: Response) {
    await this.createCommercialListUseCase.execute()
    res.status(204).json()
  }
}
