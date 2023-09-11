export class SubjectRecordModel{
    studentId!:number;
    name:string='';
    grade1:number=0;
    grade2:number=0;
    grade3:number=0;
    grade4:number=0;
    averageGrade:number = (this.grade1+this.grade2+this.grade3+this.grade4)/4
    approved:undefined|boolean = undefined;

    constructor(studentId:number = 0, name:string=''){
        this.studentId = studentId;
        this.name = name;
    }
}