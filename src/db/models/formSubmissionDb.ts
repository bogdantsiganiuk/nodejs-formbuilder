import { FieldSubmissions } from "../../models/fieldSubmissions";
import {Entity, ObjectIdColumn,Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { FormDb } from "./formDb";


@Entity()
export class FormSubmissionDb extends BaseEntity{

    @ObjectIdColumn()
    id: string;

    @ManyToOne(type => FormDb, form => form.id)
    formId: string;

    @Column()
    formFields: FieldSubmissions[];
}