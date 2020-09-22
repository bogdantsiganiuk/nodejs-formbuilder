import { FormDb } from "../db/models/formDb";
import { createConnection, getConnection, Repository } from "typeorm";
import { AbsRepository } from "./interfaces/absRepository";

export class FormsRepository implements AbsRepository<FormDb>{ // TODO: refactor into a generic MongoDbRepository<T> that uses mongodb as specific imp
    private repo: Repository<FormDb>;
    constructor(){
        createConnection().then( async () => {
            this.repo = getConnection().getRepository(FormDb);
            console.log("Connected to mongodb");
        }).catch(error => console.log(error));
    }



    async create(item: FormDb): Promise<boolean> {
        if(!this.repo) {
            this.repo = getConnection().getRepository(FormDb);
        }
        return await this.repo.save(item).then(() => {
            return true;
        },
        () => {
            // TODO LOG ERROR
            return false;
        });
    }
    async readAll(): Promise<FormDb[]> {
        if(!this.repo) {
            this.repo = getConnection().getRepository(FormDb);
        }

        return await this.repo.find();
    }
    async readOne(item: FormDb): Promise<FormDb> {
        if(!this.repo) {
            this.repo = getConnection().getRepository(FormDb);
        }
        return await this.repo.findOne(item.id);
    }
    update(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findAll(item: FormDb): Promise<FormDb[]> {
        throw new Error("Method not implemented.");
    }

}