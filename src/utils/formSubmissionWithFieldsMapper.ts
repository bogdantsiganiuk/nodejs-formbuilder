import { Form } from "../models/form";
import { FormFieldWithData } from "../models/formFieldWithData";
import { FormSubmission } from "../models/formSubmission";
import { FormSubmissionWithFields } from "../models/FormSubmissionWithFields";

export class FormSubmissionWithFieldsMapper{
    public static MapFormSubmissionWithFields(form: Form, submission: FormSubmission): FormSubmissionWithFields {
        if(!form) {
            throw new Error("form is null");
        }
        if(!submission) {
            throw new Error("submission is null");
        }

        const res = new FormSubmissionWithFields();
        res.id = submission.id;
        res.formId = form.id;
        if(Array.isArray(submission.formFields) && submission.formFields.length){
            res.formFieldsData = submission.formFields.map((field) => {
                const newField = new FormFieldWithData();
                newField.id = field.fieldId;
                newField.data = field.fieldData;
                const relevantField = form.formFields.find((item) => { return item.id == field.fieldId});
                if(relevantField){
                    newField.fieldLabel = relevantField.fieldLabel;
                    newField.inputName = relevantField.inputName;
                    newField.inputType = relevantField.inputType;
                }
                return newField;
            });
        }
        return res;
    }
}