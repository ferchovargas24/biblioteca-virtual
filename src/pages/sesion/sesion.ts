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
  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  public pedidoRef: firebase.database.Reference = firebase.database().ref('/pedidos');

  constructor(public navCtrl: NavController, public navParams: NavParams, private mensaje: ToastController
  ) {
  }

  ionViewDidLoad() {

    this.initializeItems();
  }

  createBook(autor: string, titulo: string, imagen: string, cantidad: number): void {
    this.libroRef.push({ autor, titulo, imagen, cantidad });
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
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != ' ') {
      this.libros = this.libros.filter((libro) => {
        return ((libro.autor.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (libro.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1));
      });
    }
  }


  agregarPedido(autorPedido: string, tituloPedido: string, libroImagenPedido: string, cantidad: number) {

    var idLibroPedido: string;

    if (cantidad > 0) {

      this.libroRef.on('value', libroSnapshot => {
        libroSnapshot.forEach(libroSnap => {
          if (tituloPedido == libroSnap.val().titulo) {
            idLibroPedido= " ";
            idLibroPedido = libroSnap.key;
            console.log(idLibroPedido);
          }
          return false;
        });
      });
      
      this.pedidoRef.push({ autorPedido, tituloPedido, libroImagenPedido }).then(mensaje => {
        this.mensaje.create({
          message: 'Se ha guargado tu pedido, ' + tituloPedido + ', recoge tu libro lo antes posible',
          duration: 3000,
          position: 'middle'
        }).present();

        cantidad = (cantidad - 1);
        console.log(cantidad);

        const libroReference: firebase.database.Reference = firebase.database().ref(`/libros/` + idLibroPedido);
        libroReference.update({
          cantidad
        });
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
