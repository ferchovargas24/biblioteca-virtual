import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../app/Models/User/user.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { SesionPage } from '../sesion/sesion';
import { LoginServicio } from '../../servicios/login/login.servicio';

@IonicPage()
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  usuario = {} as Usuario;
  formgroup: FormGroup;
  emailUsu: AbstractControl;
  passwordUsu: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private logingIn: LoginServicio,
    public fb: FormBuilder
  ) {

    this.formgroup = fb.group({
      emailUsu: ['', Validators.required],
      passwordUsu: ['', Validators.required],
    });


    this.emailUsu = this.formgroup.controls['emailUsu'];
    this.passwordUsu = this.formgroup.controls['passwordUsu'];
  }

  ionViewDidLoad() {

  }

  async login(usuario: Usuario) {
    await this.logingIn.loginUser(usuario).then(evento => {
      this.navCtrl.setRoot(SesionPage);
    });

  }


}
