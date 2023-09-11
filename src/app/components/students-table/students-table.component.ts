import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentModel } from 'src/app/models/students.model';
import { StudentService } from 'src/app/shared/student.service';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteStudentDialogComponent } from '../delete-student-dialog/delete-student-dialog.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchStudentService } from '../search-student/search-student.service';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<StudentModel>;
  updateStudentSub:any;
  updateSearchSub:any;
  searchInput:string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public studentService: StudentService, public dialog:MatDialog, public router:Router, public searchService: SearchStudentService){
    //popula a tabela com todos os estudantes
    this.dataSource =  new MatTableDataSource(this.studentService.getAllStudents());
    //mantém um subscription para atualizar os dados da tabela quando um aluno for adicionado, editado ou removido
    this.updateStudentSub = this.studentService.onUpdate$.subscribe(() =>{
      this.dataSource =  new MatTableDataSource(this.studentService.getAllStudents());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.updateSearchSub = this.searchService.inputFilter.subscribe((value) => {
      this.searchInput = value;
      this.applyFilter(this.searchInput);
    })
  }

  //ao clicar em um aluno da tabela, vá para o perfil desse aluno
  navigateToProfile(studentId:number){
    this.router.navigate(['/alunos/profile', studentId]);
  }
  
  //chama a dialog para edição do aluno
  openEditDialog(event:Event, aluno:StudentModel):void{
    //interrompe o evento ao clicar numa linha
    event.stopPropagation();
    this.dialog.open(EditStudentDialogComponent, {
      data: aluno,
    });
  }

    
  //chama o dialog para confirmar se deseja excluir o aluno
  openDeleteDialog(event:Event, aluno:StudentModel):void{
    //interrompe o evento ao clicar numa linha
    event.stopPropagation();
    this.dialog.open(DeleteStudentDialogComponent, {
      data: aluno,
    })
  }

  //adiciona paginator e sorteamento
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //garantia de que a subscription será cancelada ao sair do componente.
  ngOnDestroy() {
    this.updateStudentSub.unsubscribe();
    this.updateSearchSub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    //faz a busca do aluno no datasource
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //se a tabela possui paginação, retorna para a primeira página
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
