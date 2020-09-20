import { FormsController } from './controllers/formsController';
import { FormsRepository } from './repository/formsRepository';
import {App} from './app'
import {validateEnvVariables}  from './utils/ValidateEnv'
import { FormService } from './services/formService';
import { FormSubmissionController } from './controllers/formSubmissionController';
import { FormSubmissionService } from './services/formSubmissionService';
import { FormSubmissionRepository } from './repository/formSubmissinRepository';



validateEnvVariables();

const server = new App([new FormsController(new FormService(new FormsRepository())), new FormSubmissionController(new FormSubmissionService(new FormSubmissionRepository()))],parseInt(process.env.PORT,10));
server.listen();