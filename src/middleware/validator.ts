import * as express from 'express';
import {validate, ValidationError} from 'class-validator'
import {HttpError} from './httpError'
import { plainToClass  } from 'class-transformer'

export function validationMiddleware(type: any): express.RequestHandler {
    return (req, res, next) => {
        validate(plainToClass(type, req.body))
        .then((errs: ValidationError[]) => {
            if(errs.length > 0){
                const message = errs.map((err: ValidationError) => Object.values(err.constraints)).join(', ');
                next(new HttpError(400,message));
            }
            else{
                next();
            }

        });
    }
}