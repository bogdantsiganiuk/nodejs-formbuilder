"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formsController_1 = require("./controllers/formsController");
const formsRepository_1 = require("./repository/formsRepository");
const app_1 = require("./app");
const ValidateEnv_1 = require("./utils/ValidateEnv");
// import 'dotenv/config'
ValidateEnv_1.validateEnvVariables();
const server = new app_1.App([new formsController_1.FormsController(new formsRepository_1.FormsRepository())], parseInt(process.env.PORT, 10));
server.listen();
//# sourceMappingURL=index.js.map