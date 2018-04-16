import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-libros-guardados',
  templateUrl: 'libros-guardados.html',
})
export class LibrosGuardadosPage {

  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  libros : Array<any> =[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.llenarLibros();
  }

  ionViewDidLoad() {
 
  }

  llenarLibros(){
    this.libroRef.on('value', libroSnapshot => {
      this.libros = [];
      libroSnapshot.forEach(libroSnap => {
        this.libros.push(libroSnap.val());
        return false;
      });
    });
  }

  getItems(ev) {

    this.llenarLibros();

    var val = ev.target.value;

    if (val && val.trim() != ' ') {
      this.libros = this.libros.filter((libro) => {
        return ((libro.autor.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (libro.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1));
      });
    }
  }
}
