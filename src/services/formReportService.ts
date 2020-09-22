import { FormSubmissionWithFieldsMapper } from "../utils/FormSubmissionWithFieldsMapper";
import { FormSubmissionDb } from "../db/models/formSubmissionDb";
import { FormSubmission } from "../models/formSubmission";
import { FormSubmissionWithFields } from "../models/FormSubmissionWithFields";
import { FormsRepository } from "../repository/formsRepository";
import { FormSubmissionRepository } from "../repository/formSubmissinRepository";
import { FormSubmissionMapper } from "../utils/formSubmissionMapper";
import { FormService } from "./formService";
import { FormSubmissionService } from "./formSubmissionService";


export class FormReportService {
    private formService: FormService;
    private formSubmissionService: FormSubmissionService;

    constructor(formService: FormService, formSubmissionService: FormSubmissionService){
        if(!formService){
            throw new Error("repo is null");
        }
        if(!formSubmissionService){
            throw new Error("repo is null");
        }
        this.formService = formService;
        this.formSubmissionService = formSubmissionService;
    }


    public async getAllFormSubmissions(formId: string): Promise<FormSubmissionWithFields[]>{
        if(!formId){
            throw new Error("form is null");
        }

        const specificFormSubmissions = await this.formSubmissionService.getAllFormSubmissions(formId);
        const form = await this.formService.getSpecificForm(formId);

        if(!specificFormSubmissions){
            throw new Error("submissions returned as null");
        }


        return specificFormSubmissions.map(item => FormSubmissionWithFieldsMapper.MapFormSubmissionWithFields(form,item));
    }
}