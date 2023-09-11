import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parse } from 'date-fns';
import { Series } from 'src/app/enums/serie.enums';
import { StudentModel } from 'src/app/models/students.model';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.css']
})
export class AddStudentDialogComponent implements OnInit {
  addForm !: FormGroup;
  series = Object.values(Series).filter(value => typeof value === 'string');

  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    public studentService: StudentService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {}

  onSubmit(): void{
    if(this.addForm.valid){
      //cria uma nova instancia de aluno
      let newStudentData: StudentModel = new StudentModel;
      //formata a data de nascimento para um valor aceitavel para Date.
      const date = parse(this.addForm.controls['dataNascimento'].value, 'dd/MM/yyyy', new Date());
      //insere todas as informações do formulário no aluno
      newStudentData.id = this.studentService.dataSource.length+1
      newStudentData.name = this.addForm.controls['nome'].value;
      newStudentData.telefone = this.addForm.controls['telefone'].value;
      newStudentData.serie = this.addForm.controls['serie'].value;
      newStudentData.dataNascimento = date;

      //adiciona o aluno
      this.studentService.addStudent(newStudentData);
      //fecha a dialog
      this.dialogRef.close();
      //exibe mensagem de confirmação
      this.snackBar.open(newStudentData.name + ' adicionado', undefined, {duration: 3000});
    }
  }

  //fecha a dialog
  btnClose(): void {
    this.dialogRef.close();
  }

  ngOnInit():void{
    //seta o tamanho da dialog
    this.dialogRef.updateSize('300px');
    //inicializa o formulario
    this.addForm = this.formBuilder.group({
      nome: ["",Validators.required],
      telefone:[""],
      dataNascimento: ["", Validators.required],
      serie: [null, Validators.required],
    })
  }
}
