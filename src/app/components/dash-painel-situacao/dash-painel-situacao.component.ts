import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { StudentService } from 'src/app/shared/student.service';
import { Subjects } from 'src/app/enums/subjects.enum';

@Component({
  selector: 'app-dash-painel-situacao',
  templateUrl: './dash-painel-situacao.component.html',
  styleUrls: ['./dash-painel-situacao.component.css']
})
export class DashPainelSituacaoComponent {
  @ViewChild("dashboard2", { static: true}) elemento!: ElementRef;
  constructor(private studentService: StudentService){}

  ngOnInit(): void {
    let situations = this.studentService.countSituationFromEachSubject();
    let myChart = new Chart(this.elemento.nativeElement, {
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

}
