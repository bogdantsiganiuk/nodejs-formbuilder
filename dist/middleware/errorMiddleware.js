"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || "Internal Error";
    response.status(status).send({ status, message });
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map