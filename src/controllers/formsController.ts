import * as express from 'express';
import { Form } from '../models/form';
import {ControllerInterface} from './controllerInterface'
import {validationMiddleware} from '../middleware/validator'
import { FormService } from '../services/formService';

export class FormsController implements ControllerInterface {
    public path = '/forms';
    public router = express.Router();
    private formService: FormService;

    constructor(formService: FormService){
        this.initRoutes();
        if(!formService)
            throw new Error("FormService is null");
        this.formService = formService;
    }

    private initRoutes(){
        this.router.get(this.path, (req,res) => {this.getAllForms(req,res)});
        this.router.post(this.path + '/create', validationMiddleware(Form), (req,res) => {this.createForm(req,res)});
    }

    private async getAllForms(req: express.Request, res: express.Response)    {
        const forms = await this.formService.getAllForms();
        res.send(forms);
    }

    private async createForm(req: express.Request, res: express.Response)    {
        const data = req.body;
        const form = new Form();
        form.formName = data.formName;
        form.formFields = [];
        form.formFields = data.formFields.slice();
        const status = await this.formService.createNewForm(form);
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