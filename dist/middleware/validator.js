"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const class_validator_1 = require("class-validator");
const httpError_1 = require("./httpError");
const class_transformer_1 = require("class-transformer");
function validationMiddleware(type) {
    return (req, res, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, req.body))
            .then((errs) => {
            if (errs.length > 0) {
                const message = errs.map((err) => Object.values(err.constraints)).join(', ');
                next(new httpError_1.HttpError(400, message));
            }
            else {
                next();
            }
        });
    };
}
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validator.js.map