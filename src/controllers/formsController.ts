import * as express from 'express';
import { Form } from '../models/form';
import { FormsRepository } from '../repository/formsRepository';
import {ControllerInterface} from './controllerInterface'
import {validationMiddleware} from '../middleware/validator'
import { FormDb } from '../db/models/formDb';

export class FormsController implements ControllerInterface {
    public path = '/forms';
    public router = express.Router();
    private repo: FormsRepository;

    constructor(repo: FormsRepository){
        this.initRoutes();
        if(!repo)
            throw new Error("repository is null");
        this.repo = repo;
    }

    private initRoutes(){
        this.router.get(this.path, (req,res) => {this.getAllForms(req,res)});
        this.router.post(this.path, validationMiddleware(Form), (req,res) => {this.createForm(req,res)});
    }

    private async getAllForms(req: express.Request, res: express.Response)    {
        const forms = await this.repo.readAll();
        res.send(forms);
    }

    private async createForm(req: express.Request, res: express.Response)    {
        const data = req.body;
        const form = new FormDb();
        form.formName = data.formName;
        form.formFields = [];
        form.formFields.push(data.fields);
        const status = await this.repo.create(form);
        if(status){
            res.status(200);
            res.send('Success');
        }
        else{
            res.status(500);
            res.send('Creation failed, internal error');
        }
    }
}