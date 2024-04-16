import { getJwtFromHeader } from '@shared/utils/get-header-jwt'
import { Request, Response } from 'express'
import { ICreateBannersUseCase } from './modules/banner/use-cases/create-banner'
import { ICreateCommercialListUseCase } from './use-cases/create-commercial-list'
import { ICreateReviewUseCase } from './use-cases/create-review'
import { IListCommercialsUseCase } from './use-cases/list-commercials'

export default class CommercialController {
  constructor(
    private createBannersUseCase: ICreateBannersUseCase,
    private createCommercialListUseCase: ICreateCommercialListUseCase,
    private listCommercialsUseCase: IListCommercialsUseCase,
    private createReviewUseCase: ICreateReviewUseCase
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
      const results = await this.createReviewUseCase.execute({
        ...req.body,
        file: req.files?.file,
        userId: tokenInfo.userId
      })
      res.json({ results })
    }
  }
}
