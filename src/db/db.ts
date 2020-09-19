import {Connection, createConnection} from "typeorm";

export let connect =() => {

    const {
        MONGO_STRING,
        PORT
    } = process.env;
    console.log(__dirname);
    createConnection({
        "type": "mongodb",
        "host": MONGO_STRING,
        "port": parseInt(PORT,10),
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
        throw new Error("MongoDb Connection Failed")
    });
}