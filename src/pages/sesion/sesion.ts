import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { Libro } from '../../app/Models/Libros/libro-model';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html',
})
export class SesionPage {

  public libros: Array<any> = [];
  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');

  constructor(public navCtrl: NavController, public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {

    this.libroRef.on('value', libroSnapshot => {
      this.libros = [];
      libroSnapshot.forEach( libroSnap => {
        this.libros.push(libroSnap.val());
        return false;
      });
    });

  }

  createBook(autor: string, titulo: string, imagen: string): void {
    this.libroRef.push({ autor, titulo, imagen });
  }
}
