import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentModel } from 'src/app/models/students.model';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-delete-student-dialog',
  templateUrl: './delete-student-dialog.component.html',
  styleUrls: ['./delete-student-dialog.component.css']
})
export class DeleteStudentDialogComponent {

  constructor(
    public studentService: StudentService, 
    @Inject(MAT_DIALOG_DATA) public student: StudentModel,
    public dialogRef: MatDialogRef<DeleteStudentDialogComponent>){}

  deleteStudent(student: StudentModel){
    this.studentService.deleteStudent(student);
    this.dialogRef.close();
  }
}
