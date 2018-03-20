import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Usuario } from '../../app/Models/User/user.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { SesionPage } from '../sesion/sesion';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { database } from 'firebase';
import { AdministradorPage } from '../administrador/administrador';

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
    public fb: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {

    this.formgroup = fb.group({
      emailUsu: ['', Validators.required],
      passwordUsu: ['', Validators.required],
    });


    this.emailUsu = this.formgroup.controls['emailUsu'];
    this.passwordUsu = this.formgroup.controls['passwordUsu'];

  }

  async login(usuario: Usuario) {


    await this.logingIn.loginUser(usuario);

    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    setTimeout(() => {

      if (this.logingIn.isLogged == true && this.logingIn.isAdmin == false) {
        this.navCtrl.setRoot(SesionPage,{email:this.usuario.email});

        this.toastCtrl.create({
          message: `Bienvenido ${usuario.email}`,
          duration: 3000
        }).present();

      } else {
        

        if (this.logingIn.isLogged == true && this.logingIn.isAdmin == true) {
          this.navCtrl.setRoot(AdministradorPage);
          this.toastCtrl.create({
            message: `Bienvenido administrador  ${usuario.email}`,
            duration: 3000
          }).present();

        } else {
          this.toastCtrl.create({
            message: 'Algo salió mal, intentalo de nuevo',
            duration: 3000
          }).present();
        }
      }
      loading.dismiss();
    }, 2000)
  }
}
