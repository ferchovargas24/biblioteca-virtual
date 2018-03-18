import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { HomePage } from '../home/home';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private logOutService: LoginServicio,
              private loadingCtrl: LoadingController,
              private mensaje: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministradorPage');
  }

  createBook(autor: string, titulo: string, imagen: string, cantidad: number): void {
    this.libroRef.push({ autor, titulo, imagen, cantidad }).then(evento=>{
      this.mensaje.create({
        message: 'Se ha guargado el nuevo libro con titulo: , ' + titulo ,
        duration: 3000,
        position: 'middle'
      }).present();
    });
  }

  async logOut() {
    await this.logOutService.logout();
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "!Hasta Luego! Regresa Pronto"
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.setRoot(HomePage);
      loading.dismiss();
    }, 400)

  }
}
