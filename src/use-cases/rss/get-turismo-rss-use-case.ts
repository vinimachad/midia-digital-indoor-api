import { it } from 'node:test'
import Parser from 'rss-parser'
import { z } from 'zod'

export interface IGetTourismRssUseCase {
  execute()
}

export type News = {
  type: string
  title: string
  image_url: string
  delay: number
  qrcode: string
}

export default class GetTourismRssUseCase implements IGetTourismRssUseCase {
  async execute() {
    let tourismNews: News[] = []
    let parser = new Parser()
    let feed = await parser.parseURL(
      'https://g1.globo.com/rss/g1/turismo-e-viagem/'
    )

    feed.items.map((item, index) => {
      let { content, title, link } = item
      let image_url = this.findImageUrlByRegex(content)

      if (!title || !image_url || !link) return

      let qrcode = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${link}`
      tourismNews.push({
        type: 'G1',
        title: title,
        qrcode,
        image_url,
        delay: 15
      })
    })

    return tourismNews
  }

  private findImageUrlByRegex(text?: string) {
    if (!text) return null

    const regex = /<img.*?src="(.*?)".*?>/
    const link = text.match(regex)

    if (!link) return null

    return link[1]
  }
}
