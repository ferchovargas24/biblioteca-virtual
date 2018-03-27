import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { Usuario } from '../../app/Models/User/user.model';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pagina-registro',
  templateUrl: 'pagina-registro.html',
})
export class PaginaRegistroPage {

  usuario = {} as Usuario;
  formgroup: FormGroup;
  emailUsu: AbstractControl;
  passwordUsu: AbstractControl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private logService: LoginServicio,
    public fb: FormBuilder, ) {

    this.formgroup = fb.group({
      emailUsu: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      passwordUsu: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
    });


    this.emailUsu = this.formgroup.controls['emailUsu'];
    this.passwordUsu = this.formgroup.controls['passwordUsu'];
  }

  registarUsuario(usuario: Usuario) {
    this.logService.register(usuario);

  }

  registrarEnBase(usuario: Usuario, admin: boolean) {
    this.logService.registrarEnBase(usuario, admin);
    console.log(admin);
  }

}
