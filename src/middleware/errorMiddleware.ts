import { HttpError } from "./httpError";
import {Request,Response,NextFunction} from 'express';


export function errorMiddleware(error: HttpError, request: Request, response: Response, next: NextFunction){
    const status = error.status || 500;
    const message = error.message || "Internal Error";
    response.status(status).send({status,message});
}
