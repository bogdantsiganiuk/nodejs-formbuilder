import { ControllerInterface } from "./controllerInterface";
import * as express from 'express';
import { FormSubmissionService } from "../services/formSubmissionService";
import { FormSubmission } from "../models/formSubmission";
import { validationMiddleware } from "../middleware/validator";
import { FormSubmissionDb } from "../db/models/formSubmissionDb";

export class FormSubmissionController implements ControllerInterface{
    public router: express.Router;
    public path: string;
    private service: FormSubmissionService;

    constructor(service : FormSubmissionService) {
        if(!service){
            throw new Error("service is null")
        }
        this.service = service;
        this.router = express.Router();
        this.path = "/submissions"
        this.initRoutes();

    }

    private initRoutes(){
        this.router.post(this.path, validationMiddleware(FormSubmission), (req,res) => {this.createFormSubmission(req,res)});
    }

    private async createFormSubmission(req: express.Request, res: express.Response){
        const data = req.body;
        const formData = new FormSubmissionDb();
        formData.formId = req.body.formId;
        formData.formFields = [];
        formData.formFields = req.body.formFields.slice();
        const status = await this.service.createNewSubmission(formData);
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