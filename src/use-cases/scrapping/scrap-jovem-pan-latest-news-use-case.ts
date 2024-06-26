import { News } from '@type/news-model'
import axios from 'axios'
import * as cheerio from 'cheerio'

export interface IScrapJovemPanLatestNewsUseCase {
  execute(): Promise<News[]>
}

export default class ScrapJovemPanLatestNewsUseCase {
  async execute() {
    try {
      const url = 'https://jovempan.com.br/noticias'
      const response = await axios.get(url)
      const data: any = response.data
      const $ = cheerio.load(data)

      let highlightedPosts = this.addHighlightedPosts($)
      let articlePosts = this.addArticlePosts($)
      return [...highlightedPosts, ...articlePosts]
    } catch (error) {
      throw error
    }
  }

  private addArticlePosts($: cheerio.CheerioAPI) {
    return this.addListNewsPostsBySelector($, 'article')
  }

  private addHighlightedPosts($: cheerio.CheerioAPI) {
    return this.addListNewsPostsBySelector($, '.highlight-item')
  }

  private addListNewsPostsBySelector($: cheerio.CheerioAPI, selector: string) {
    let newsList: News[] = []
    $(selector).each((_, element) => {
      let news = this.findNewsPostDetails($, element)
      if (news) newsList.push(news)
    })
    return newsList
  }

  private findNewsPostDetails($: cheerio.CheerioAPI, element: cheerio.AnyNode): News | undefined {
    const title = $(element).find('.post-title').text()
    const url = $(element).find('a').attr('href')
    const image_url = $(element).find('.wp-post-image').attr('src')
    let qrcode = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${url}`

    if (!url || !image_url) return

    const pattern = /https:\/\/[^\/]+\/([^\.]+)\.html/
    const result = url.match(pattern)
    let id = url

    if (result) {
      id = result[1].replaceAll('/', '-')
    }

    return { id, type: 'JPan', title, image_url, delay: 20, qrcode, url }
  }
}
