import { FormDb } from "../db/models/formDb";
import { Form } from "../models/form";
import { AbsRepository } from "../repository/interfaces/absRepository";
import { FormsMapper } from "../utils/formsMapper";

export class FormService {
    private repo: AbsRepository<FormDb>;

    constructor(repo: AbsRepository<FormDb>){
        if(!repo){
            throw new Error("repo is null");
        }
        this.repo = repo;
    }

    public async getAllForms(): Promise<Form[]>{
        const forms = await this.repo.readAll();
        if(!forms){
            throw new Error("Forms returned as null");
        }

        return forms.map(form => FormsMapper.MapFormDb(form));
    }

    public async createNewForm(item: Form): Promise<boolean>{
        if(!item){
            throw new Error("item is null");
        }

        return await this.repo.create(FormsMapper.MapForm(item));
    }
}