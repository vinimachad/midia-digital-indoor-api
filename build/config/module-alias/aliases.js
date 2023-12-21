"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    '@controllers': path_1.default.join(__dirname, '..', 'src', 'controllers'),
    '@routes': path_1.default.join(__dirname, '..', 'src', 'routes'),
    '@usecases': path_1.default.join(__dirname, '..', 'src', 'use-cases'),
    '@entities': path_1.default.join(__dirname, '..', 'src', 'entities')
};
