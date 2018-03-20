import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-mis-libros',
  templateUrl: 'mis-libros.html',
})
export class MisLibrosPage {

public usuRef: firebase.database.Reference = firebase.database().ref('/administradores');
email: string;
public misLibros: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.email = navParams.get('email');
  }

  ionViewDidLoad() {

    this.mostrarMisLibros();
  }

  mostrarMisLibros(){
    var idUsuario;
    this.usuRef.on('value', usuarioSnapshot => {
      usuarioSnapshot.forEach(usuSnap => {
        if(this.email == usuSnap.val().email){
          idUsuario = usuSnap.key
        }
        return false;
      });
    });

    const usuarioReference: firebase.database.Reference = firebase.database().ref(`/administradores/` + idUsuario + '/misLibros');

    usuarioReference.on('value', libroSnapshot => {
      this.misLibros = [];
      libroSnapshot.forEach(libroSnap => {
        this.misLibros.push(libroSnap.val());
        return false;
      });
    });
  }
  
}
