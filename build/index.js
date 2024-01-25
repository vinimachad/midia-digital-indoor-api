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
require("dotenv/config");
require("./config/module-alias");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use('*', (0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(process.env.PORT || 8080, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('| -------------------------------- |');
    console.log('| server started ✅                |');
    console.log(`| on: http://localhost:${process.env.PORT}|`);
}));
