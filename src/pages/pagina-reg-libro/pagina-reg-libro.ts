import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-pagina-reg-libro',
  templateUrl: 'pagina-reg-libro.html',
})
export class PaginaRegLibroPage {

  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private mensaje: ToastController) {
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
}
