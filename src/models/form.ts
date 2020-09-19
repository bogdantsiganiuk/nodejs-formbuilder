import {FormField} from './formField'
import {IsString,IsArray} from 'class-validator';

export class Form{
    @IsString()
    public formName: string;

    @IsArray()
    public fields: FormField[];
}