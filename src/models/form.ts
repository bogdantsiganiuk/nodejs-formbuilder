import {FormField} from './formField'
import {IsString,IsArray} from 'class-validator';

export class Form{

    public id: string;

    @IsString()
    public formName: string;

    @IsArray()
    public formFields: FormField[];
}