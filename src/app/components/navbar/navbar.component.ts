import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() Drawer:any;
  usuarioLogado:string="";
  subscription !: Subscription;

  constructor(private shared:SharedService, private router:Router){
    //escuta o username para ativar ou desativar o nome do usuário na toolbar quando logar ou deslogar 
    this.subscription = shared.getUsername().subscribe((retorno:string) => {
      this.usuarioLogado=retorno;
    })
  }

  //sai da conta
  btnSair():void {
    this.shared.setUsername("");
    this.router.navigate(["login"]);
  }

  //abre o drawer
  public showDrawer(){
    this.Drawer.toggle();
  }

}
