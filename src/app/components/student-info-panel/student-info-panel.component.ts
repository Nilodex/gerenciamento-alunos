import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentModel } from 'src/app/models/students.model';
import { StudentService } from 'src/app/shared/student.service';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { DeleteStudentDialogComponent } from '../delete-student-dialog/delete-student-dialog.component';

@Component({
  selector: 'app-student-info-panel',
  templateUrl: './student-info-panel.component.html',
  styleUrls: ['./student-info-panel.component.css']
})
export class StudentInfoPanelComponent {

  @Input() Student!: StudentModel;

  constructor(public student: StudentModel, public studentService: StudentService, public dialog:MatDialog){}

  //chama o dialog para editar o aluno
  openEditDialog(aluno:StudentModel):void{
    this.dialog.open(EditStudentDialogComponent, {
      data: aluno,
    });
  }

  //chama o dialog para confirmar se deseja excluir o aluno
  openDeleteDialog(aluno:StudentModel):void{
    this.dialog.open(DeleteStudentDialogComponent, {
      data: aluno,
    })
  }

}
