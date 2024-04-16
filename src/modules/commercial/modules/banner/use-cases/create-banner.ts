import { UploadReturn } from '@configs/aws'
import { Banner } from '@prisma/client'
import { UploadedFile } from 'express-fileupload'
import BannerRepository, { IBannerRepository } from '../repository'
import UploadBannersUseCase from './upload-banners'

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
    let uploads = await this.uploadBannersUseCase.execute(files)

    if (Array.isArray(uploads)) {
      await this.handleManyBanners(uploads)
    } else {
      await this.handleSingleBanner(uploads)
    }
  }

  private async handleSingleBanner(upload: UploadReturn) {
    let { newUrls, existingBanners } = await this.alreadyExistsUrls([upload])
    await this.updateUrlOfExistingBanners(existingBanners)
    await this.createManyBanners(newUrls)
  }

  private async handleManyBanners(uploads: UploadReturn[]) {
    let { newUrls, existingBanners } = await this.alreadyExistsUrls(uploads)
    await this.updateUrlOfExistingBanners(existingBanners)
    await this.createManyBanners(newUrls)
  }

  private async alreadyExistsUrls(uploads: UploadReturn[]) {
    let existingBanners = await this.repository.findManyByUrl(uploads)
    let existingBannersUrls = existingBanners.map((item) => item.url)

    let newUrls = uploads.filter((upload) => !existingBannersUrls.includes(upload.url))
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

  private async createManyBanners(uploads: UploadReturn[]) {
    let banner = uploads.map((upload) => {
      return { url: upload.url }
    })
    await this.repository.createMany(banner)
  }
}
