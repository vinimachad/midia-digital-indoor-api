import { Banner, News, Weather } from '@prisma/client'

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
