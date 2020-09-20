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
}