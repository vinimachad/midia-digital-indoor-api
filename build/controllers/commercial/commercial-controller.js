"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const create_commercial_use_case_1 = __importDefault(require("../../use-cases/commercial/create-commercial-use-case"));
class CommercialController {
    constructor(createCommercialUseCase = new create_commercial_use_case_1.default()) {
        this.createCommercialUseCase = createCommercialUseCase;
    }
    create(req, res) {
        let commercialModel = zod_1.z.object({
            url: zod_1.z.string(),
            time_seconds: zod_1.z.number()
        });
        this.createCommercialUseCase.execute(commercialModel.parse(req.body));
    }
    list(req, res) { }
}
exports.default = CommercialController;
