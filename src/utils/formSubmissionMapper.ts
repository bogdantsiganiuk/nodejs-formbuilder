import { FormSubmissionDb } from "../db/models/formSubmissionDb";
import { FormSubmission } from "../models/formSubmission";

export class FormSubmissionMapper{
    public static MapFormSubmissionDb(input: FormSubmissionDb) : FormSubmission{
        if(!input){
            throw new Error("input is null");
        }

        const formSub = new FormSubmission();
        formSub.id = input.id;
        formSub.formId = input.formId;
        formSub.formFields = input.formFields.slice();

        return formSub;
    }

    public static MapFormSubmission(input: FormSubmission) : FormSubmissionDb{
        if(!input){
            throw new Error("input is null");
        }

        const formSub = new FormSubmissionDb();
        formSub.id = input.id;
        formSub.formId = input.formId;
        formSub.formFields = input.formFields.slice();

        return formSub;
    }
}