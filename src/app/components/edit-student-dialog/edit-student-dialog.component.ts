import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { parse } from 'date-fns';
import { Series } from 'src/app/enums/serie.enums';
import { StudentModel } from 'src/app/models/students.model';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.css']
})

export class EditStudentDialogComponent implements OnInit {
  editForm !: FormGroup;
  originalStudentData: StudentModel = new StudentModel;
  modifiedStudentData: StudentModel = new StudentModel;
  dataTest: string = '';
  series = Object.values(Series).filter(value => typeof value === 'string');


  constructor(
    public studentService: StudentService, 
    @Inject(MAT_DIALOG_DATA) public student: StudentModel,
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    private formBuilder: FormBuilder){
      this.originalStudentData = this.student;
  }

  onSubmit():void{
    if(!this.editForm.valid){
      return alert("Existem campos que não foram preenchidos corretamente!");
    }
    this.dataTest = this.editForm.controls['dataNascimento'].value;
    const date = parse(this.dataTest, 'dd/MM/yyyy', new Date());
    this.modifiedStudentData.id = this.originalStudentData.id;
    this.modifiedStudentData.name = this.editForm.controls['nome'].value;
    this.modifiedStudentData.telefone = this.editForm.controls['telefone'].value;
    this.modifiedStudentData.dataNascimento = date;
    this.modifiedStudentData.serie = this.editForm.controls['serie'].value;

    //se já existe um estudante com os novos dados
    if(this.studentService.studentRegisterExists(this.modifiedStudentData)){
      return alert("Outro aluno já existe com esses dados");
    }
    //altera o aluno
    this.studentService.editStudent(this.originalStudentData, this.modifiedStudentData);
    //fecha a dialog
    this.dialogRef.close();
  }

  //ao iniciar o componente, inicializa o formulário com os dados do aluno
  ngOnInit():void{
    this.editForm = this.formBuilder.group({
      nome: [this.studentService.getStudentName(this.originalStudentData), Validators.required],
      telefone: [this.studentService.getStudentPhone(this.originalStudentData)],
      dataNascimento: [this.studentService.getStudentBirthdateToString(this.originalStudentData), Validators.required],
      serie: [this.originalStudentData.serie, Validators.required],
    })
  }

  btnClose(){
    this.dialogRef.close();
  }

}
