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
const create_commercial_list_use_case_1 = __importDefault(require("@usecases/commercial/create-commercial-list-use-case"));
const list_commercials_use_case_1 = __importDefault(require("@usecases/commercial/list-commercials-use-case"));
const create_banner_use_case_1 = __importDefault(require("@usecases/commercial/banner/create-banner-use-case"));
class CommercialController {
    constructor(createBannerUseCase = new create_banner_use_case_1.default(), createCommercialListUseCase = new create_commercial_list_use_case_1.default(), listCommercialsUseCase = new list_commercials_use_case_1.default()) {
        this.createBannerUseCase = createBannerUseCase;
        this.createCommercialListUseCase = createCommercialListUseCase;
        this.listCommercialsUseCase = listCommercialsUseCase;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createBannerUseCase.execute(req.file);
            res.json({ message: 'ok' });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number(req.query.page);
            let limit = Number(req.query.limit);
            let results = yield this.listCommercialsUseCase.execute(page, limit);
            res.status(200).json({ results });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createCommercialListUseCase.execute();
            res.status(204).json();
        });
    }
}
exports.default = CommercialController;
