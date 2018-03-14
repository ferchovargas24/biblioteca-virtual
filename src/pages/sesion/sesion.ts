import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html',
})
export class SesionPage {

  public libros: Array<any> = [];
  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  public iterador: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {

    this.initializeItems();
  }

  createBook(autor: string, titulo: string, imagen: string): void {
    this.libroRef.push({ autor, titulo, imagen });
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
        return ( item.autor.toLowerCase().indexOf(
          val.toLowerCase()) > -1);
      })
    }
  }

  agregarPedido(autorPedido: string){
    console.log(autorPedido);
  }
}
