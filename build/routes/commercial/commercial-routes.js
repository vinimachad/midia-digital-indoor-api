"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commercial_controller_1 = __importDefault(require("@controllers/commercial/commercial-controller"));
const upload_1 = __importDefault(require("@middlewares/upload"));
const express_1 = require("express");
const commercialController = new commercial_controller_1.default();
const commercialRoutes = (0, express_1.Router)();
commercialRoutes.put('/update', (req, res) => commercialController.update(req, res));
commercialRoutes.post('/create/banner', upload_1.default.single('file'), (req, res) => commercialController.create(req, res));
commercialRoutes.get('/list', (req, res) => commercialController.list(req, res));
exports.default = commercialRoutes;
