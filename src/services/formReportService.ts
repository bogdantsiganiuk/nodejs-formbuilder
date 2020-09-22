import { FormSubmissionDb } from "../db/models/formSubmissionDb";
import { FormSubmission } from "../models/formSubmission";
import { FormsRepository } from "../repository/formsRepository";
import { FormSubmissionRepository } from "../repository/formSubmissinRepository";
import { FormSubmissionMapper } from "../utils/formSubmissionMapper";


export class FormReportService {
    private submissionsRepo: FormSubmissionRepository;

    constructor(submissionsRepo: FormSubmissionRepository){
        if(!submissionsRepo){
            throw new Error("repo is null");
        }
        this.submissionsRepo = submissionsRepo;
    }

    public async getFormSubmissionAmount(id: string): Promise<number>{
        if(!id){
            throw new Error("form is null");
        }

        const specificFormSubmissions = await this.getAllFormSubmissions(id);

        return specificFormSubmissions.length;
    }

    public async getAllFormSubmissions(id: string): Promise<FormSubmission[]>{
        if(!id){
            throw new Error("form is null");
        }
        const submissionToSearchFor = new FormSubmissionDb();
        submissionToSearchFor.formId = id;

        const specificFormSubmissions = await this.submissionsRepo.findAll(submissionToSearchFor);

        if(!specificFormSubmissions){
            throw new Error("submissions returned as null");
        }

        return specificFormSubmissions.map(item => FormSubmissionMapper.MapFormSubmissionDb(item));
    }
}