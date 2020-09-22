"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsRepository = void 0;
const formDb_1 = require("../db/models/formDb");
const typeorm_1 = require("typeorm");
class FormsRepository {
    constructor() {
        typeorm_1.createConnection().then(async () => {
            this.repo = typeorm_1.getConnection().getRepository(formDb_1.FormDb);
            console.log("Connected to mongodb");
        }).catch(error => console.log(error));
    }
    create(item) {
        if (!this.repo) {
            this.repo = typeorm_1.getConnection().getRepository(formDb_1.FormDb);
        }
        return this.repo.save(item).then(() => {
            return true;
        }, () => {
            // TODO LOG ERROR
            return false;
        });
    }
    readAll() {
        if (!this.repo) {
            this.repo = typeorm_1.getConnection().getRepository(formDb_1.FormDb);
        }
        return this.repo.find();
    }
    readOne(item) {
        return this.repo.findOne(item.formName);
    }
    update(id) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    findAll(item) {
        throw new Error("Method not implemented.");
    }
}
exports.FormsRepository = FormsRepository;
//# sourceMappingURL=formsRepository.js.map