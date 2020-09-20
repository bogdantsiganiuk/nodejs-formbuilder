import { FormSubmissionDb } from "../db/models/formSubmissionDb";
import { createConnection, getConnection, Repository } from "typeorm";
import { AbsRepository } from "./interfaces/absRepository";

export class FormSubmissionRepository implements AbsRepository<FormSubmissionDb>{ // TODO: Delete this, use generic mongodbrepository<FormSubmissionDb> instead.

    private repo: Repository<FormSubmissionDb>;


    constructor(){
        createConnection().then( async () => {
            this.repo = getConnection().getRepository(FormSubmissionDb);
            console.log("Connected to mongodb");
        }).catch(error => console.log(error));
    }

    create(item: FormSubmissionDb): Promise<boolean> {
        if(!this.repo) {
            this.repo = getConnection().getRepository(FormSubmissionDb);
        }
        return this.repo.save(item).then(() => {
            return true;
        },
        (error) => {
            // TODO LOG ERROR
            console.log(error);
            return false;
        });
    }
    readAll(): Promise<FormSubmissionDb[]> {
        throw new Error("Method not implemented.");
    }
    readOne(item: FormSubmissionDb): Promise<FormSubmissionDb> {
        throw new Error("Method not implemented.");
    }
    update(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}