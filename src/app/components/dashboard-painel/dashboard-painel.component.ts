import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-dashboard-painel',
  templateUrl: './dashboard-painel.component.html',
  styleUrls: ['./dashboard-painel.component.css']
})
export class DashboardPainelComponent implements OnInit, OnDestroy {
  updateStudentSub:any;
  myChart!:Chart;
  @ViewChild("myCanvas", { static: true}) elemento!: ElementRef;
  constructor(private studentService: StudentService){}

  //TO-DO evitar repetições de código, ter um único componente que controle ambos os charts

  createChart(){
    this.myChart = new Chart(this.elemento.nativeElement, {
      type: 'bar',
      data: {
        labels: ['1º ano', '2º ano', '3º ano', '4º ano', '5º ano', '6º ano', '7º ano', '8º ano', '9º ano'],
        datasets: [
          {
            indexAxis: 'y',
            label: 'Alunos',
            backgroundColor: 'rgba(20, 20, 200, 0.5',
            data: [
              this.studentService.countStudentsFromSerie('ano1'),
              this.studentService.countStudentsFromSerie('ano2'),
              this.studentService.countStudentsFromSerie('ano3'),
              this.studentService.countStudentsFromSerie('ano4'),
              this.studentService.countStudentsFromSerie('ano5'),
              this.studentService.countStudentsFromSerie('ano6'),
              this.studentService.countStudentsFromSerie('ano7'),
              this.studentService.countStudentsFromSerie('ano8'),
              this.studentService.countStudentsFromSerie('ano9'),
            ]
          },
        ]
      }
    });
  }

  destroyChart(){
    this.myChart.destroy();
  }

  ngOnInit(): void {
    this.createChart();
    this.updateStudentSub = this.studentService.onUpdate$.subscribe(() =>{
      this.destroyChart();
      this.createChart();
    })
  }

  ngOnDestroy(): void{
    this.updateStudentSub.unsubscribe();
  }

}
