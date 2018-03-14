import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    public fb: FormBuilder,
    private toastCtrl : ToastController
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
    await this.logingIn.loginUser(usuario);
    
    setTimeout(() => {
      if(this.logingIn.isLogged == true){
        this.navCtrl.setRoot(SesionPage);
        console.log("se inicio sesion")
      }else{
        this.toastCtrl.create({
          message: 'Algo salió mal, intentalo de nuevo',
        duration: 3000
        }).present();
        console.log("estas en add-user.ts" + this.logingIn.isLogged)
      }
    },1000) 
      
          

    
  }


}
