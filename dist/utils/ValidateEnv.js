"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvVariables = void 0;
const envalid_1 = require("envalid");
function validateEnvVariables() {
    envalid_1.cleanEnv(process.env, {
        MONGO_STRING: envalid_1.str(),
        PORT: envalid_1.port()
    });
}
exports.validateEnvVariables = validateEnvVariables;
//# sourceMappingURL=ValidateEnv.js.map