import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _username:BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  //checa se usuário está logado (username não pode estar vazio)
  isAuthenticated():boolean{
    let user=this._username.getValue();
    if(user){
      return true;
    }
    return false;
  }

  setUsername(username:string){
    this._username.next(username);
  }

  getUsername(){
    return this._username.asObservable();
  }
}
