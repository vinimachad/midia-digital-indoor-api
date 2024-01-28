import { UploadedFile } from 'express-fileupload'
import BannerRepository, {
  IBannerRepository
} from '@usecases/commercial/banner/banner-repository'
import UploadBannersUseCase from '@usecases/upload-image-storage/upload-banners-use-case'
import { Banner, Prisma } from '.prisma/client'

export interface ICreateBannersUseCase {
  execute(file?: UploadedFile | UploadedFile[])
}

export default class CreateBannersUseCase implements ICreateBannersUseCase {
  constructor(
    private uploadBannersUseCase = new UploadBannersUseCase(),
    private repository: IBannerRepository = new BannerRepository()
  ) {}

  async execute(files?: UploadedFile | UploadedFile[]) {
    if (!files) throw new Error('É necessario uma imagem para fazer o upload')
    let urls = await this.uploadBannersUseCase.execute(files)

    if (Array.isArray(urls)) {
      await this.handleManyBanners(urls)
    } else {
      await this.handleSingleBanner(urls)
    }
  }

  private async handleSingleBanner(url: string) {
    let { newUrls, existingBanners } = await this.alreadyExistsUrls([url])
    await this.updateUrlOfExistingBanners(existingBanners)
    await this.createManyBanners(newUrls)
  }

  private async handleManyBanners(urls: string[]) {
    let { newUrls, existingBanners } = await this.alreadyExistsUrls(urls)
    await this.updateUrlOfExistingBanners(existingBanners)
    await this.createManyBanners(newUrls)
  }

  private async alreadyExistsUrls(urls: string[]) {
    let existingBanners = await this.repository.findManyByUrl(urls)
    let existingBannersUrls = existingBanners.map((item) => item.url)

    let newUrls = urls.filter((url) => !existingBannersUrls.includes(url))
    return {
      existingBanners,
      newUrls
    }
  }

  private async updateUrlOfExistingBanners(banners: Banner[]) {
    for (let banner of banners) {
      await this.repository.update(banner)
    }
  }

  private async createManyBanners(urls: string[]) {
    let banner = urls.map((url) => {
      return { url }
    })
    await this.repository.createMany(banner)
  }
}
