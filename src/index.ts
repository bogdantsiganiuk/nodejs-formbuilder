import { FormsController } from './controllers/formsController';
import { FormsRepository } from './repository/formsRepository';
import {App} from './app'
import {validateEnvVariables}  from './utils/ValidateEnv'
import { FormService } from './services/formService';
import { FormSubmissionController } from './controllers/formSubmissionController';
import { FormSubmissionService } from './services/formSubmissionService';
import { FormSubmissionRepository } from './repository/formSubmissinRepository';
import { FormReportService } from './services/formReportService';



validateEnvVariables();
const formRepository = new FormsRepository();
const formSubmissionRepository = new FormSubmissionRepository();
const formService = new FormService(formRepository);
const formSubmissionService = new FormSubmissionService(formSubmissionRepository);
const server = new App([new FormsController(formService), new FormSubmissionController(formSubmissionService, new FormReportService(formService,formSubmissionService))],parseInt(process.env.PORT,10));
server.listen();