import { FormDb } from "../db/models/formDb";
import { Form } from "../models/form";

export class FormsMapper{
    public static MapFormDb(input: FormDb): Form{
        if(!input){
            throw new Error("input is null");
        }
        const form = new Form();
        form.formName = input.formName;
        form.formFields = input.formFields.slice();
        form.id = input.id;

        return form;
    }

    public static MapForm(input: Form): FormDb{
        if(!input){
            throw new Error("input is null");
        }
        const form = new FormDb();
        form.formName = input.formName;
        form.formFields = input.formFields.slice();
        form.id = input.id;

        return form;
    }
}