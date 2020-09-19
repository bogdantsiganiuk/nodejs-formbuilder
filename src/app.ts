import express from 'express';
import * as bodyParser from 'body-parser';
import {connect} from './db/db'
import { Form } from './models/form';
import { FormField } from './models/formField';
import { ControllerInterface } from './controllers/controllerInterface';
import { errorMiddleware } from './middleware/errorMiddleware';

export class App {

    private expressApp: express.Application;
    public port: number;

    constructor(controllers: ControllerInterface[], port: number){
        this.expressApp = express();
        this.port = port;

        this.initMiddleware();
        this.initControllers(controllers);
    }

    private initMiddleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(errorMiddleware)
    }

    private initControllers(controllers: ControllerInterface[]) {
        controllers.forEach(element => {
            this.expressApp.use('/', element.router);
        });
    }

    private initDb(){
        connect();
    }

    public listen() {
        this.expressApp.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        })
    }

// app.get('/', (req, res) => res.send('Hello World!'));

// app.get('/test', (req, res) => {
//      const form = new Form();
//      const formfield = new FormField();
//      formfield.id = 1;
//      formfield.inputName =  "test";
//      formfield.inputType = 1;
//      formfield.fieldLabel = "testlabel";
//      form.formFields = [formfield];
//      form.save();
//     res.send('test!')});

// app.post('/forms/create', (req, res) => {
//      const form = new Form();
//      form.formFields = [];
//      req.body.fields.array.forEach((element: FormField) => {
//          form.formFields.push(element);
//      });
//      form.save();
//     res.send('test!')});



    }
