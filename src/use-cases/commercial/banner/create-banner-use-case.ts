import BannerRepository, {
  IBannerRepository
} from '@repositories/commercial/banner-repository'

export interface ICreateBannerUseCase {
  execute(file?: Express.Multer.File)
}

export default class CreateBannerUseCase implements ICreateBannerUseCase {
  constructor(private repository: IBannerRepository = new BannerRepository()) {}

  async execute(file?: any) {
    if (!file) throw new Error('É necessario uma imagem para fazer o upload')
    await this.repository.create({ url: file.location })
  }
}
