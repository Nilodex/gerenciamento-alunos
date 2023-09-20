import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { StudentService } from 'src/app/shared/student.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild("myCanvas", { static: true}) elemento!: ElementRef;
  constructor(private studentService: StudentService){}

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 2, rows: 1 },
      ];
    })
  );

  ngOnInit(): void {
      let myChart = new Chart(this.elemento.nativeElement, {
        type: 'bar',
        data: {
          labels: ['1º ano', '2º ano', '3º ano', '4º ano', '5º ano', '6º ano', '7º ano', '8º ano', '9º ano'],
          datasets: [
            {
              indexAxis: 'y',
              label: 'quantidade de alunos',
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
}
