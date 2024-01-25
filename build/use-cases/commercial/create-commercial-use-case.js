"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banner_repository_1 = __importDefault(require("@usecases/commercial/banner/banner-repository"));
const list_weather_use_case_1 = __importDefault(require("./weather/list-weather-use-case"));
const news_repository_1 = __importDefault(require("@repositories/commercial/news-repository"));
class CreateCommercialUseCase {
    constructor(newsRepository = new news_repository_1.default(), bannerRepository = new banner_repository_1.default(), listWeatherUseCase = new list_weather_use_case_1.default()) {
        this.newsRepository = newsRepository;
        this.bannerRepository = bannerRepository;
        this.listWeatherUseCase = listWeatherUseCase;
    }
    execute(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = [];
            let news = yield this.newsRepository.listWithPagination(skip, limit);
            let banners = yield this.bannerRepository.list();
            let weathers = yield this.listWeatherUseCase.execute();
            for (let i = 0; i < news.length; i++) {
                let weather = weathers[i % weathers.length];
                data.push({ weather, banners, news: news[i] });
            }
            return data;
        });
    }
}
exports.default = CreateCommercialUseCase;
