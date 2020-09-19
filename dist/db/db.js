"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const typeorm_1 = require("typeorm");
exports.connect = () => {
    const { MONGO_STRING, PORT } = process.env;
    console.log(__dirname);
    typeorm_1.createConnection({
        "type": "mongodb",
        "host": MONGO_STRING,
        "port": parseInt(PORT, 10),
        "database": "forms",
        "name": "default",
        "synchronize": false,
        "entities": [
            './db/models/*.js',
            './db/models/*.ts'
        ],
        "cli": {
            entitiesDir: "./db/models/",
        }
    }).then(() => {
        console.log("Connected");
    }, () => {
        // LOG ERROR
        throw new Error("MongoDb Connection Failed");
    });
};
//# sourceMappingURL=db.js.map