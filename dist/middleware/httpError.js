"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=httpError.js.map