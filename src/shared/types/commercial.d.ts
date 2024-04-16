import { Banner, News, Weather } from '@prisma/client'
import { UploadedFile } from 'express-fileupload'

export namespace CommercialSection {
  interface NewsSectionItem {
    kind: 'NEWS'
    data: News
  }

  interface WeatherSectionItem {
    kind: 'WEATHER'
    data: Weather
  }

  interface BannerSectionItem {
    kind: 'BANNER'
    data: Banner
  }

  type SectionItem = NewsSectionItem | WeatherSectionItem | BannerSectionItem
}

export type Commercial = CommercialSection.SectionItem[]

export namespace CommercialAnalysis {
  export type Request = {
    userId: string
    index: number
    title: string
    description: string
    file: UploadedFile
  }
}
