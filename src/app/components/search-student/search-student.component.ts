import { Component } from '@angular/core';
import { SearchStudentService } from './search-student.service';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent {

  constructor(private searchService: SearchStudentService){}

  storeFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchService.sendInputFilter(filterValue);
  }

}
