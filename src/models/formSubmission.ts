import { IsArray, IsString } from "class-validator";
import { FieldSubmissions } from "./fieldSubmissions";

export class FormSubmission{
    id: string;

    @IsString()
    formId: string;

    @IsArray()
    formFields: FieldSubmissions[];

}