import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform} from 'ionic-angular';
import { Usuario } from '../../app/Models/User/user.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { SesionPage } from '../sesion/sesion';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { AdministradorPage } from '../administrador/administrador';
import firebase from 'firebase'
import { Keyboard } from '@ionic-native/keyboard';

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
    public keyboard : Keyboard,
    private platform : Platform
  ) {

    this.formgroup = fb.group({
      emailUsu: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      passwordUsu: ['',Validators.compose([Validators.minLength(6),Validators.maxLength(14), Validators.pattern('[a-zA-Z0-9]*') ,Validators.required]) ],
    });


    this.emailUsu = this.formgroup.controls['emailUsu'];
    this.passwordUsu = this.formgroup.controls['passwordUsu'];

    this.platform.ready().then(() => {
     this.keyboard.disableScroll(true);
    });
    
  }


  async login(usuario: Usuario) {


    await this.logingIn.loginUser(usuario);

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content:"Iniciando"
    });
    loading.present();

    setTimeout(() => {

      console.log(this.logingIn.isLogged)
      console.log(this.logingIn.isAdmin)
      if (this.logingIn.isLogged == true && this.logingIn.isAdmin == false) {
        this.navCtrl.setRoot(SesionPage, { email: this.usuario.email });

        this.toastCtrl.create({
          message: `Bienvenido ${usuario.email}`,
          duration: 3000
        }).present();

      } else {


        if (this.logingIn.isLogged == true && this.logingIn.isAdmin == true) {
          this.navCtrl.setRoot(AdministradorPage, { email: this.usuario.email });
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
    }, 4000)
  }
}
