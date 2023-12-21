"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, req, res, next) {
    console.log(error);
    res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
}
exports.default = errorHandler;
