import {Entity, ObjectIdColumn,Column, BaseEntity} from "typeorm";
import {FormField} from "../../models/formField"

@Entity()
export class FormDb extends BaseEntity{

    @ObjectIdColumn()
    formName: string;

    @Column()
    formFields: FormField[];
}