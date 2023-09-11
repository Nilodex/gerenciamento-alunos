import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubjectRecordModel } from 'src/app/models/subject-record.model';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-edit-grade-dialog',
  templateUrl: './edit-grade-dialog.component.html',
  styleUrls: ['./edit-grade-dialog.component.css']
})
export class EditGradeDialogComponent implements OnInit {

  gradeForm !: FormGroup;
  studentSubjectRecord: SubjectRecordModel = new SubjectRecordModel();

  constructor(
  public studentService: StudentService, 
    @Inject(MAT_DIALOG_DATA) public subjectRecord: SubjectRecordModel,
    public dialogRef: MatDialogRef<EditGradeDialogComponent>,
    private formBuilder: FormBuilder){
      this.studentSubjectRecord = subjectRecord;
  }

  onSubmit():void{
    //faça algo
    this.studentSubjectRecord.grade1 = this.gradeForm.controls['nota1'].value;
    this.studentSubjectRecord.grade2 = this.gradeForm.controls['nota2'].value;
    this.studentSubjectRecord.grade3 = this.gradeForm.controls['nota3'].value;
    this.studentSubjectRecord.grade4 = this.gradeForm.controls['nota4'].value;
    this.studentSubjectRecord.averageGrade = (this.studentSubjectRecord.grade1 + this.studentSubjectRecord.grade2 + this.studentSubjectRecord.grade3 + this.studentSubjectRecord.grade4)/4;
    if(this.gradeForm.controls['fecharNotas'].value){
      if(this.studentSubjectRecord.averageGrade >= 7){
        this.studentSubjectRecord.approved = true;
      }
      else{
        this.studentSubjectRecord.approved = false;
      }
    }
    else{
      this.studentSubjectRecord.approved = undefined;
    }
    this.studentService.editStudentRecords(this.studentSubjectRecord);
    this.dialogRef.close();
  }

  //ao iniciar o componente, inicializa o formulário com as notas do aluno
  ngOnInit():void{
    this.gradeForm = this.formBuilder.group({
      nota1: this.subjectRecord.grade1,
      nota2: this.subjectRecord.grade2,
      nota3: this.subjectRecord.grade3,
      nota4: this.subjectRecord.grade4,
      fecharNotas: this.subjectRecord.approved != undefined ? true : false,
    })
  }

  btnClose(){
    this.dialogRef.close();
  }

}
