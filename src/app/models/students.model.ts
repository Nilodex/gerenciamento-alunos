import { Injectable } from "@angular/core";
import { Series } from "../enums/serie.enums";
import { SubjectRecordModel } from "./subject-record.model";
import { Subjects } from "../enums/subjects.enum";

@Injectable({
    providedIn: 'root'
})

export class StudentModel{
    id!:number;
    name:string='';
    telefone:string='';
    dataNascimento:Date = new Date();
    serie!: Series;
    records:SubjectRecordModel[] = [
        new SubjectRecordModel(this.id, 'Português'),
        new SubjectRecordModel(this.id, 'Matemática'),
        new SubjectRecordModel(this.id, 'História'),
        new SubjectRecordModel(this.id, 'Geografia'),
        new SubjectRecordModel(this.id, 'Ciências'),
        new SubjectRecordModel(this.id, 'Inglês'),
        new SubjectRecordModel(this.id, 'Informática')
    ];
}