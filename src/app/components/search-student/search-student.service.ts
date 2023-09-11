import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchStudentService {

  inputFilter:EventEmitter<string> = new EventEmitter();

  constructor() { }

  sendInputFilter(value:string){
    this.inputFilter.emit(value);
  }

  /*applyFilter(event: Event) {
    //guarda o valor
    const filterValue = (event.target as HTMLInputElement).value;
    //faz a busca do aluno no datasource
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //se a tabela possui paginação, retorna para a primeira página
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/
}
