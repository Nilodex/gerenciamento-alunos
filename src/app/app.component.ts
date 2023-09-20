import { Component, OnInit } from '@angular/core';
import { StudentService } from './shared/student.service';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gerenciamento-alunos';
  isAuth:boolean = false;
  constructor(private studentService: StudentService, private shared: SharedService){}

  reiniciarDados(){
    this.studentService.init();
  }

  ngOnInit(){
    //escuta a variavel username caso ocorra mudança
    this.shared.getUsername().subscribe((retorno: string) => {
      if(retorno){
        this.isAuth=true;
      }
      else{
        this.isAuth=false;
      }
    });
    //Inicializando todos os dados dos alunos ao iniciar a aplicação.
    this.studentService.init();
  }


}
