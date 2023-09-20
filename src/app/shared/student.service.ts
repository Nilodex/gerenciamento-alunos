import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { StudentModel } from '../models/students.model';
import { SubjectRecordModel } from '../models/subject-record.model';
import { Series } from '../enums/serie.enums';
import { parse } from 'date-fns';
import { Subjects } from '../enums/subjects.enum';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
  dataSource: StudentModel[] = [];
  //emitirá eventos para outros componentes quando o dataSource for alterado através das funções abaixo
  public onUpdate$ = new EventEmitter();

  addStudent(student:StudentModel):void{
      //adiciona o aluno na array
      console.log(student);
      this.dataSource.push(student);
      //cria uma nova instancia da array
      this.dataSource = Array.from(this.dataSource);
      this.onUpdate$.emit();
  }

  getStudent(studentId:number):StudentModel{
    let student:StudentModel|undefined = this.dataSource.find((item) => item.id==studentId);
    if(!student)
    {
      return new StudentModel();
    }
    return student;
  }

  getAllStudents():StudentModel[]{
    return this.dataSource;
  }

  getStudentName(student:StudentModel):string{
    return student.name;
  }

  getStudentPhone(student:StudentModel):string{
    return student.telefone;
  }

  getStudentBirthdate(student:StudentModel):Date{
    return student.dataNascimento;
  }

  getStudentBirthdateToString(student:StudentModel):string{
     //formatando a data para o formato DD/MM/YYYY
     const dateString = student.dataNascimento.toLocaleDateString("pt-br", 
     {
       year: "numeric",
       month: "2-digit",
       day: "2-digit"
     })
     return dateString;
  }

  //checa se o estudante com mesmo nome e email existe
  studentRegisterExists(student: StudentModel):boolean{
    if(this.dataSource.find((item) => 
      item.name==student.name 
      && item.telefone==student.telefone
      && item.dataNascimento == student.dataNascimento))
    {
      return true;
    }
    return false;
  }

  //altera um estudante
  editStudent(oldStudent: StudentModel, newStudent: StudentModel):void{
    let index = this.dataSource.findIndex((item) => item==oldStudent);
    this.dataSource[index] = {
      id: this.dataSource[index].id, 
      name: newStudent.name, 
      telefone: newStudent.telefone, 
      dataNascimento: newStudent.dataNascimento,
      serie: newStudent.serie,
      records: oldStudent.records};
    this.dataSource = Array.from(this.dataSource);
    this.onUpdate$.emit();
  }

  deleteStudent(student: StudentModel):void{
    let index = this.dataSource.findIndex((item) => item==student);
    if(index > -1){
      this.dataSource.splice(index, 1);
    }
    this.dataSource = Array.from(this.dataSource);
    this.onUpdate$.emit();
  }

  getStudentRecords(studentId: number):SubjectRecordModel[]{
    let student = this.getStudent(studentId);
    return student.records;
  }

  //Edita as notas do aluno em uma certa matéria
  editStudentRecords(newStudentRecords: SubjectRecordModel):void{
    const studentIndex = this.dataSource.findIndex((item) => item.id==newStudentRecords.studentId);
    const recordIndex = this.dataSource[studentIndex].records.findIndex((record) => record.name == newStudentRecords.name);
    this.dataSource[studentIndex].records[recordIndex] = {
      studentId: this.dataSource[studentIndex].records[recordIndex].studentId,
      name: this.dataSource[studentIndex].records[recordIndex].name,
      grade1: newStudentRecords.grade1,
      grade2: newStudentRecords.grade2,
      grade3: newStudentRecords.grade3,
      grade4: newStudentRecords.grade4,
      averageGrade: newStudentRecords.averageGrade,
      approved: newStudentRecords.approved,
    }
    console.log(this.dataSource[studentIndex].records[recordIndex]);
    this.dataSource = Array.from(this.dataSource);
  }

  countStudentsFromSerie(serie: string):number{
    const qtdAlunos = this.dataSource.filter(aluno => aluno.serie == Series[serie as keyof typeof Series]).length;
    console.log(serie + ' = ' + qtdAlunos);
    return qtdAlunos;
  }

  //passa a situação geral (aprovado ou reprovado) de todos os alunos por materia.
  //situações indefinidas são ignoradas
  countSituationFromEachSubject():any[]{
    let situations = [
      {nomeMateria: Subjects.portugues, qtdAprovados: 0, qtdReprovados: 0, qtdIndefinidos: 0 },
      {nomeMateria: Subjects.matematica, qtdAprovados: 0, qtdReprovados: 0, qtdIndefinidos: 0 },
      {nomeMateria: Subjects.historia, qtdAprovados: 0, qtdReprovados: 0, qtdIndefinidos: 0 },
      {nomeMateria: Subjects.geografia, qtdAprovados: 0, qtdReprovados: 0, qtdIndefinidos: 0 },
      {nomeMateria: Subjects.ciencias, qtdAprovados: 0, qtdReprovados: 0, qtdIndefinidos: 0 },
      {nomeMateria: Subjects.informatica, qtdAprovados: 0, qtdReprovados: 0, qtdIndefinidos: 0 },
      {nomeMateria: Subjects.ingles, qtdAprovados: 0, qtdReprovados: 0, qtdIndefinidos: 0 },
    ];
    this.dataSource.forEach(aluno => { //para cada aluno
      aluno.records.forEach(record => { //para cada boletim de uma materia de um aluno
        const situationIndex = situations.findIndex((item) => item.nomeMateria==record.name);
        let qtdAprovados:number = situations[situationIndex].qtdAprovados;
        let qtdReprovados:number = situations[situationIndex].qtdReprovados;
        let qtdIndefinidos:number = situations[situationIndex].qtdIndefinidos;
        situations[situationIndex] = 
        {
          nomeMateria: situations[situationIndex].nomeMateria,
          qtdAprovados: record.approved == true ? ++qtdAprovados : qtdAprovados,
          qtdReprovados: record.approved == false ? ++qtdReprovados : qtdReprovados,
          qtdIndefinidos: record.approved == undefined ? ++qtdIndefinidos : qtdIndefinidos
        }
      });
    });
    console.log(situations);
    return situations;
  }


  // Função para gerar uma data de nascimento aleatória
  getRandomDate():Date {
    const year = Math.floor(Math.random() * (2000 - 1980 + 1)) + 1980; // Ano entre 1980 e 2000
    const month = Math.floor(Math.random() * 12) + 1; // Mês entre 1 e 12
    const day = Math.floor(Math.random() * 28) + 1; // Dia entre 1 e 28 (para simplificar os meses)
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedDate:string = `${formattedDay}/${formattedMonth}/${year}`;
    //convertendo a data que está em string para Date.
    const date = parse(formattedDate, 'dd/MM/yyyy', new Date());
    return date;
  }

  //função para gerar um 'número de telefone' aleatório
  getRandomPhoneNumber():string {
    const randomNumber:number = Math.floor(Math.random() * (9999999 - 1000000) + 1000000); //gera um número entre 1000000 e 999999
    let randomPhoneNumber:string = "7598" + randomNumber.toString(); //concatena o numero gerado com a inicial 7598
    return randomPhoneNumber;
  }

  //função para gerar uma série aleatória
  getRandomSerie():string {
    const randomNumber:number = Math.floor(Math.random() * (10 - 1) + 1); //gera um número entre 1 e 9
    let randomSerie:string = "ano" + randomNumber.toString(); //converte o número para string e concatena com ano, gerando uma string entre ano1 até ano9
    return randomSerie;
  }

  getRandomGrade(): number {
    const randomGrade = Math.random()*11; //gera uma nota flutuante entre 0 e 11 (11 excluso)
    if(randomGrade >= 10){
      return Math.floor(randomGrade); //se a nota for maior que 10 (ex 10,5), retorna 10
    }
    return Math.round(randomGrade * 10)/10 //caso contrário retorna a nota com 1 casa decimal
  }

  //função para gerar uma situação para o aluno.
  getRandomSituation(averageGrade:number): undefined | boolean{
    const notasEncerradas = (Math.random() < 0.5); //50% de chance de gerar nota encerrada
    if(notasEncerradas){
      if(averageGrade >= 7){
        return true; //se a nota for maior que 7, aprovado
      }
      return false; //caso contrário, recuperação
    }
    return; //se as notas não foram encerradas, situação indefinida.
  }

  init():void{
    this.dataSource.pop();
    // Preenchimento da array com 10 alunos aleatórios
    for(let i:number = 1; i <= 10 ; i++){ //loop alunos
      let notas:number[][] = [];
      for(let j = 0; j <= 6; j++){ //loop para materias
        notas[j] = [];
        for(let k = 0; k <= 3; k++){ //loop para notas
          notas[j][k] = this.getRandomGrade();
        }
      }
      this.dataSource.push(
        {
          id: i,
          name: `Aluno${i}`,
          telefone: this.getRandomPhoneNumber(),
          dataNascimento: this.getRandomDate(),
          serie: Series[this.getRandomSerie() as keyof typeof Series], //um workaround para utilizar a string como chave de series enum
          records: [
            new SubjectRecordModel(
              i, //id do aluno
              Subjects.portugues, //materia
              notas[0][0],  //nota 1
              notas[0][1],  //nota 2
              notas[0][2],  //nota 3
              notas[0][3],  //nota 4
              this.getRandomSituation((notas[0][0]+notas[0][1]+notas[0][2]+notas[0][3])/4), //situação = aprovado, em recuperação ou indefinido
            ),
            new SubjectRecordModel(
              i, 
              Subjects.matematica,
              notas[1][0],
              notas[1][1],
              notas[1][2],
              notas[1][3],
              this.getRandomSituation((notas[1][0]+notas[1][1]+notas[1][2]+notas[1][3])/4),
            ),
            new SubjectRecordModel(
              i, 
              Subjects.historia,
              notas[2][0],
              notas[2][1],
              notas[2][2],
              notas[2][3],
              this.getRandomSituation((notas[2][0]+notas[2][1]+notas[2][2]+notas[2][3])/4),
            ),
            new SubjectRecordModel(
              i, 
              Subjects.geografia,
              notas[3][0],
              notas[3][1],
              notas[3][2],
              notas[3][3],
              this.getRandomSituation((notas[3][0]+notas[3][1]+notas[3][2]+notas[3][3])/4),
            ),
            new SubjectRecordModel(
              i, 
              Subjects.ciencias,
              notas[4][0],
              notas[4][1],
              notas[4][2],
              notas[4][3],
              this.getRandomSituation((notas[4][0]+notas[4][1]+notas[4][2]+notas[4][3])/4),
            ),
            new SubjectRecordModel(
              i,
              Subjects.ingles,
              notas[5][0],
              notas[5][1],
              notas[5][2],
              notas[5][3],
              this.getRandomSituation((notas[5][0]+notas[5][1]+notas[5][2]+notas[5][3])/4),
            ),
            new SubjectRecordModel(
              i, 
              Subjects.informatica,
              notas[6][0],
              notas[6][1],
              notas[6][2],
              notas[6][3],
              this.getRandomSituation((notas[6][0]+notas[6][1]+notas[6][2]+notas[6][3])/4),
            )
          ]
        }
      );
    }
    this.onUpdate$.emit();
  }
}
