"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./config/module-alias");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
require("express-async-errors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(process.env.PORT || 8080, () => {
    console.log('| -------------------------------- |');
    console.log('| Generate excel server started ✅ |');
});
