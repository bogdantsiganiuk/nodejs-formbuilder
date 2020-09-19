import {cleanEnv, port, str} from 'envalid'

export function validateEnvVariables(){
    cleanEnv(process.env, {
        MONGO_STRING: str(),
        PORT: port()
    });
}