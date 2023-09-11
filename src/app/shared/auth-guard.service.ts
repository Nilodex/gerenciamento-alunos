import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private shared:SharedService, private router:Router) { }

  //checa se usuário pode acessar um componente (precisa estar logado)
  canActivate():Observable<boolean> | boolean{
    let logged:boolean= this.shared.isAuthenticated();
    //caso não esteja, manda para o login
    if(!logged){
      this.router.navigate(['login']);
    }
    return logged;
  }
}
