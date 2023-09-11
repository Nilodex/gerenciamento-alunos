import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  durationInSeconds = 5;
  mensagemLogin:string="";
  loginForm !: FormGroup;

  constructor(private router:Router, private shared:SharedService, private formBuilder: FormBuilder){}

  onSubmit():void{
    if(this.loginForm.valid){
      const username = this.loginForm.controls['username'].value;
      const password = this.loginForm.controls['password'].value;
      if(username != 'admin' || password != 'admin'){
        //falha
        this.mensagemLogin='Credenciais incorretas';
      }
      else{
        //sucesso
        this.shared.setUsername(username);
        this.router.navigate(["home"]);
      }
    }
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }
}
