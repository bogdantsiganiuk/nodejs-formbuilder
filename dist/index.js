"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formsController_1 = require("./controllers/formsController");
const formsRepository_1 = require("./repository/formsRepository");
const app_1 = require("./app");
const ValidateEnv_1 = require("./utils/ValidateEnv");
const formService_1 = require("./services/formService");
const formSubmissionController_1 = require("./controllers/formSubmissionController");
const formSubmissionService_1 = require("./services/formSubmissionService");
const formSubmissinRepository_1 = require("./repository/formSubmissinRepository");
const formReportService_1 = require("./services/formReportService");
ValidateEnv_1.validateEnvVariables();
const formRepository = new formsRepository_1.FormsRepository();
const formSubmissionRepository = new formSubmissinRepository_1.FormSubmissionRepository();
const formService = new formService_1.FormService(formRepository);
const formSubmissionService = new formSubmissionService_1.FormSubmissionService(formSubmissionRepository);
const server = new app_1.App([new formsController_1.FormsController(formService), new formSubmissionController_1.FormSubmissionController(formSubmissionService, new formReportService_1.FormReportService(formService, formSubmissionService))], parseInt(process.env.PORT, 10));
server.listen();
//# sourceMappingURL=index.js.map