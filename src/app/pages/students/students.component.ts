import { Component } from '@angular/core';
import { AddStudentDialogComponent } from 'src/app/components/add-student-dialog/add-student-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  constructor(public dialog: MatDialog) {}
  //abre a dialog para inserir novo aluno
  openAddStudentDialog(): void{
    this.dialog.open(AddStudentDialogComponent);
  }

}
