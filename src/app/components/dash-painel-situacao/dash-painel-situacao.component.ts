import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-dash-painel-situacao',
  templateUrl: './dash-painel-situacao.component.html',
  styleUrls: ['./dash-painel-situacao.component.css']
})

//TO-DO evitar repetições de código, ter um único componente que controle ambos os charts
export class DashPainelSituacaoComponent implements OnInit, OnDestroy{
  private myChart!:Chart;
  updateStudentSub:any;
  @ViewChild("dashboard2", { static: true}) elemento!: ElementRef;
  constructor(private studentService: StudentService){}

  createChart():void{
    let situations = this.studentService.countSituationFromEachSubject();
    this.myChart = new Chart(this.elemento.nativeElement, {
      type: 'bar',
      data: {
        labels: [situations[0].nomeMateria, situations[1].nomeMateria, situations[2].nomeMateria, situations[3].nomeMateria, situations[4].nomeMateria, situations[5].nomeMateria, situations[6].nomeMateria],
        datasets: [
          {
            label: 'Aprovados',
            backgroundColor: 'rgba(20, 200, 20, 0.5)',
            data: [
              situations[0].qtdAprovados,
              situations[1].qtdAprovados,
              situations[2].qtdAprovados,
              situations[3].qtdAprovados,
              situations[4].qtdAprovados,
              situations[5].qtdAprovados,
              situations[6].qtdAprovados,
            ],
          },
          {
            label: 'Reprovados',
            backgroundColor: 'rgba(200, 20, 20, 0.5)',
            data: [
              situations[0].qtdReprovados,
              situations[1].qtdReprovados,
              situations[2].qtdReprovados,
              situations[3].qtdReprovados,
              situations[4].qtdReprovados,
              situations[5].qtdReprovados,
              situations[6].qtdReprovados,
            ],
          },
          {
            label: 'Indefinidos',
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            data: [
              situations[0].qtdIndefinidos,
              situations[1].qtdIndefinidos,
              situations[2].qtdIndefinidos,
              situations[3].qtdIndefinidos,
              situations[4].qtdIndefinidos,
              situations[5].qtdIndefinidos,
              situations[6].qtdIndefinidos,
            ],
          },

        ],
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

  ngOnDestroy():void{
    this.updateStudentSub.unsubscribe();
  }

}
