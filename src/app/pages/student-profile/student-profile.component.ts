import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentModel } from 'src/app/models/students.model';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {

  studentId:number = 0;

  constructor(public student: StudentModel, public studentService: StudentService, private route: ActivatedRoute){}

  ngOnInit():void{
    let receivedStudentId = this.route.snapshot.paramMap.get('id');
    if(receivedStudentId != null){
      this.studentId = +receivedStudentId;
    }
  }
}
