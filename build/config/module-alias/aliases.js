"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    '@controllers': path_1.default.join(__dirname, '..', '..', 'controllers'),
    '@routes': path_1.default.join(__dirname, '..', '..', 'routes'),
    '@usecases': path_1.default.join(__dirname, '..', '..', 'use-cases'),
    '@entities': path_1.default.join(__dirname, '..', '..', 'entities'),
    '@configs': path_1.default.join(__dirname, '..', '..', 'config'),
    '@repositories': path_1.default.join(__dirname, '..', '..', 'repositories'),
    '@middlewares': path_1.default.join(__dirname, '..', '..', 'middlewares')
};
