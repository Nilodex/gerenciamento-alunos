import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { StudentModel } from '../models/students.model';
import { SubjectRecordModel } from '../models/subject-record.model';
import { Series } from '../enums/serie.enums';
import { parse } from 'date-fns';

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
    this.onUpdate$.emit();
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
    const randomNumber:number = Math.floor(Math.random() * (9 - 1) + 1); //gera um número entre 1 e 9
    let randomSerie:string = "ano" + randomNumber.toString(); //converte o número para string e concatena com ano, gerando uma string entre ano1 até ano9
    return randomSerie;
  }

  init():void{
    // Preenchimento da array com 10 alunos aleatórios
    for(let i:number = 1; i <= 10 ; i++){
      this.dataSource.push(
        {
          id: i,
          name: `Aluno${i}`,
          telefone: this.getRandomPhoneNumber(),
          dataNascimento: this.getRandomDate(),
          serie: Series[this.getRandomSerie() as keyof typeof Series], //um workaround para utilizar a string como chave de series enum
          records: [
            new SubjectRecordModel(i, 'Português'),
            new SubjectRecordModel(i, 'Matemática'),
            new SubjectRecordModel(i, 'História'),
            new SubjectRecordModel(i, 'Geografia'),
            new SubjectRecordModel(i, 'Ciências'),
            new SubjectRecordModel(i, 'Inglês'),
            new SubjectRecordModel(i, 'Informática')
          ]
        }
      )
    }
  }
}
