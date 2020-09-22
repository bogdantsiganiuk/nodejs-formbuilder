import { FormSubmissionDb } from "../db/models/formSubmissionDb";
import { FormSubmission } from "../models/formSubmission";
import { AbsRepository } from "../repository/interfaces/absRepository";
import { FormSubmissionMapper } from "../utils/formSubmissionMapper";

export class FormSubmissionService{
    private repo: AbsRepository<FormSubmissionDb>;

    constructor(repo: AbsRepository<FormSubmissionDb>){
        if(!repo){
            throw new Error("repo is null");
        }
        this.repo = repo;
    }

    public async createNewSubmission(submission: FormSubmission) : Promise<boolean>{
        if(!submission){
            throw new Error("Submission is null");
        }

        return await this.repo.create(FormSubmissionMapper.MapFormSubmission(submission));
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

        const specificFormSubmissions = await this.repo.findAll(submissionToSearchFor);

        if(!specificFormSubmissions){
            throw new Error("submissions returned as null");
        }

        return specificFormSubmissions.map(item => FormSubmissionMapper.MapFormSubmissionDb(item));
    }

}