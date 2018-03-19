import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { Usuario } from '../../app/Models/User/user.model';

@IonicPage()
@Component({
  selector: 'page-pagina-registro',
  templateUrl: 'pagina-registro.html',
})
export class PaginaRegistroPage {

  usuario = {} as Usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams, private logService: LoginServicio) {
  }
  registarUsuario(usuario : Usuario){
    this.logService.register(usuario);

  }

  registrarEnBase(usuario : Usuario, admin: boolean){
    this.logService.registrarEnBase( usuario, admin);
    console.log(admin);
  }

}
