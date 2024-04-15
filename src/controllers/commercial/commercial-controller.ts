import { Request, Response } from 'express'
import CreateCommercialListUseCase, {
  ICreateCommercialListUseCase
} from '@usecases/commercial/create-commercial-list-use-case'
import ListCommercialsUseCase, { IListCommercialsUseCase } from '@usecases/commercial/list-commercials-use-case'
import CreateBannersUseCase, { ICreateBannersUseCase } from '@usecases/commercial/banner/create-banner-use-case'
import { ICommercialModel } from '@models/commercial/commercial-model'
import CommercialFactory from '@factories/commercial-fatory'
import { getJwtFromHeader } from '@controllers/uitls/get-header-jwt'

export default class CommercialController {
  constructor(
    private createBannersUseCase: ICreateBannersUseCase = new CreateBannersUseCase(),
    private createCommercialListUseCase: ICreateCommercialListUseCase = new CreateCommercialListUseCase(),
    private listCommercialsUseCase: IListCommercialsUseCase = new ListCommercialsUseCase(),
    private commercialModel: ICommercialModel = CommercialFactory.model()
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

  async createReview(req: Request, res: Response) {
    const tokenInfo = getJwtFromHeader(req)

    if (tokenInfo) {
      const results = await this.commercialModel.createCommercialAnalysis({
        ...req.body,
        file: req.files?.file,
        userId: tokenInfo.userId
      })
      res.json({ results })
    }
  }
}
