import {Entity, ObjectIdColumn,Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";
import {FormField} from "../../models/formField"

@Entity()
export class FormDb extends BaseEntity{

    @ObjectIdColumn()
    id: string;

    @Column()
    formName: string;

    @Column()
    formFields: FormField[];
}