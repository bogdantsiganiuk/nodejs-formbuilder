import { connect } from "../db/db";
import { FormDb } from "../db/models/formDb";
import { createConnection, getConnection, Repository } from "typeorm";
import { AbsRepository } from "./interfaces/absRepository";

export class FormsRepository implements AbsRepository<FormDb>{
    public repo: Repository<FormDb>;
    constructor(){
        createConnection().then( async () => {
            this.repo = getConnection().getRepository(FormDb);
            console.log("Connected to mongodb");
        }).catch(error => console.log(error));
    }


    create(item: FormDb): Promise<boolean> {
        if(!this.repo) {
            this.repo = getConnection().getRepository(FormDb);
        }
        return this.repo.save(item).then(() => {
            return true;
        },
        () => {
            // TODO LOG ERROR
            return false;
        });
    }
    readAll(): Promise<FormDb[]> {
        if(!this.repo) {
            this.repo = getConnection().getRepository(FormDb);
        }

        return this.repo.find();
    }
    readOne(item: FormDb): Promise<FormDb> {
        return this.repo.findOne(item.formName);
    }
    update(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}