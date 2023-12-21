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
const commercial_repository_1 = __importDefault(require("repositories/commercial/commercial-repository"));
class CreateCommercialUseCase {
    constructor(commercialRepository = new commercial_repository_1.default()) {
        this.commercialRepository = commercialRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data) {
                throw new Error('Precisamos de todos os dados para criar uma propaganda');
            }
            yield this.commercialRepository.create(data);
        });
    }
}
exports.default = CreateCommercialUseCase;
