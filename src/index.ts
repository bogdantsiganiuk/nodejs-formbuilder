import { FormsController } from './controllers/formsController';
import { FormsRepository } from './repository/formsRepository';
import {App} from './app'
import {validateEnvVariables}  from './utils/ValidateEnv'
// import 'dotenv/config'



validateEnvVariables();

const server = new App([new FormsController(new FormsRepository())],parseInt(process.env.PORT,10));
server.listen();