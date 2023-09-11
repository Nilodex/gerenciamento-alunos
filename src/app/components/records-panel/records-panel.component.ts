import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubjectRecordModel } from 'src/app/models/subject-record.model';
import { EditGradeDialogComponent } from '../edit-grade-dialog/edit-grade-dialog.component';

@Component({
  selector: 'app-records-panel',
  templateUrl: './records-panel.component.html',
  styleUrls: ['./records-panel.component.css']
})
export class RecordsPanelComponent {

  @Input() Records:SubjectRecordModel[] = [];

  constructor(public dialog:MatDialog){}

  OpenEditRecordDialog(record:SubjectRecordModel):void{
    this.dialog.open(EditGradeDialogComponent, {
      data: record,
    });
  }

  printStudentSituation(situation:undefined|boolean):string{
    if(situation == true){
      return "APROVADO";
    }
    if(situation == false){
      return "RECUPERAÇÃO"
    }
    return "";
  }
}
