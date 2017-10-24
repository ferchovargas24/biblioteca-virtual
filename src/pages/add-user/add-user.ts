import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../app/Models/User/user.model';
import { ListaUsuariosServicio } from '../../servicios/lista-usuarios/lista-usuarios.servicio';
import { MensajeServicio } from '../../servicios/mensaje/mensaje.service';
import { LoginServicio } from '../../servicios/login/login.servicio';




@IonicPage()
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  usuario = {} as Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private registro: ListaUsuariosServicio,
    private toast: MensajeServicio,
    private logingIn: LoginServicio,
  ) {
  }

  ionViewDidLoad() {

  }

  addUser(usuario: Usuario) {

    this.registro.addUser(usuario).then(ref => {
      this.toast.show(`${usuario.email} registrado!`);
    });
  }

  async login(usuario: Usuario) {
     await this.logingIn.loginUser(usuario);
     
  }
}
