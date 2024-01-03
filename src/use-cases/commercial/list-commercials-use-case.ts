import CommercialRepository, {
  ICommercialRepository
} from '@repositories/commercial/commercial-repository'

export type CommercialsPaginated = {
  totalPages: number
  currentPage: number
  previous?: number
  next?: {
    page: number
    limit: number
  }
  data: any[]
}

export interface IListCommercialsUseCase {
  execute(skip: number, take: number): Promise<CommercialsPaginated>
}

export default class ListCommercialsUseCase implements IListCommercialsUseCase {
  constructor(
    private commercialRepository: ICommercialRepository = new CommercialRepository()
  ) {}

  async execute(page: number, limit: number): Promise<CommercialsPaginated> {
    const totalCommercials = await this.commercialRepository.count()
    const totalPages = Math.ceil(totalCommercials / limit)
    const skip = (page - 1) * limit
    const endIndex = page * limit
    let previous = page === 1 ? undefined : page - 1
    let next =
      page === totalPages
        ? undefined
        : {
            page: page + 1,
            limit
          }

    const data = await this.commercialRepository.list(skip, limit)

    return {
      totalPages,
      currentPage: page,
      previous,
      next,
      data
    }
  }
}
