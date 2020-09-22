import { ControllerInterface } from "./controllerInterface";
import * as express from 'express';
import { FormSubmissionService } from "../services/formSubmissionService";
import { FormSubmission } from "../models/formSubmission";
import { validationMiddleware } from "../middleware/validator";
import { FormSubmissionDb } from "../db/models/formSubmissionDb";
import { FormReportService } from "../services/formReportService";

export class FormSubmissionController implements ControllerInterface{
    public router: express.Router;
    public path: string;
    private service: FormSubmissionService;
    private reportService: FormReportService;

    constructor(service : FormSubmissionService, reportService: FormReportService) {
        if(!service){
            throw new Error("service is null")
        }
        if(!reportService){
            throw new Error("service is null")
        }
        this.service = service;
        this.reportService = reportService;
        this.router = express.Router();
        this.path = "/submissions"
        this.initRoutes();

    }

    private initRoutes(){
        this.router.post(this.path , validationMiddleware(FormSubmission), (req,res) => {this.createFormSubmission(req,res)});
        this.router.get(this.path + '/:formId', (req,res) => {this.getFormSubmissions(req,res)});

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

    private async getFormSubmissions(req: express.Request, res: express.Response)    {
        if(!req.params.formId){
            throw new Error("formId is not specified")
        }

        const submissions = await this.reportService.getAllFormSubmissions(req.params.formId);
        if(!submissions){
            throw new Error("Submissions returned null")
        }
        res.status(200);
        if(submissions.length === 0){
            res.send('No submissions found for FormId:' + req.params.formId);
        }
        else{
            const count = submissions.length.toString();
            res.header('X-Total-Count', count);
            res.send(submissions);
        }

    }
}