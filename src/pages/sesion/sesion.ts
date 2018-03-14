import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html',
})
export class SesionPage {

  public libros: Array<any> = [];
  public numeroPedido: number;
  public nuevaCantidad: number;
  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  public pedidoRef: firebase.database.Reference = firebase.database().ref('/pedidos');

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensaje: ToastController
  ) {
  }

  ionViewDidLoad() {

    this.initializeItems();
  }

  createBook(idLibro: number = 0 , autor: string, titulo: string, imagen: string, cantidad: number): void {
    idLibro +1;
    this.libroRef.push({ idLibro, autor, titulo, imagen, cantidad });
  }

  initializeItems() {

    this.libroRef.on('value', libroSnapshot => {
      this.libros = [];
      libroSnapshot.forEach(libroSnap => {
        this.libros.push(libroSnap.val());
        return false;
      });
    });
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.libros = this.libros.filter((item) => {
        return (item.autor.toLowerCase().indexOf(
          val.toLowerCase()) > -1);
      })
    }
  }


  agregarPedido(idLibroPedido: number, autorPedido: string, tituloPedido: string, libroImagenPedido: string, libroCantidad: number) {

      
      if (libroCantidad > 0 ) {

        this.pedidoRef.push({ autorPedido, tituloPedido, libroImagenPedido }).then(mensaje => {
          this.mensaje.create({
            message: 'Se ha guargado tu pedido, ' + tituloPedido + ', recoge tu libro lo antes posible',
            duration: 2000,
            position: 'middle'
          }).present();
          console.log(libroCantidad);
          libroCantidad = (libroCantidad - 1);
          this.libroRef.update({idLibroPedido, libroCantidad});
        })
      } else {
        this.mensaje.create({
          message: 'No tenemos libros en existencia, intenta mas tarde',
          duration: 2000,
          position: 'middle'
        }).present();

      }
  }
}
