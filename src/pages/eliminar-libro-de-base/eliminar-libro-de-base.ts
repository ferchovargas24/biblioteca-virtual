import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import firebase from 'firebase'


@IonicPage()
@Component({
  selector: 'page-eliminar-libro-de-base',
  templateUrl: 'eliminar-libro-de-base.html',
})
export class EliminarLibroDeBasePage {

  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  libros: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      private alertCtrl: AlertController,
    private mensaje : ToastController) {
  }

  ionViewDidLoad() {
    this.llenarLibros();
  }

  llenarLibros() {
    this.libroRef.on('value', libroSnapshot => {
      libroSnapshot.forEach(libroSnap => {
        this.libros.push(libroSnap.val().titulo)
        return false;
      });
    });
  }

  eliminarLibro(libro) {

    var idLibroEliminar;

    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: '¿Quieres eliminar el libro?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.libroRef.on('value', libroSnapshot => {
              libroSnapshot.forEach(libroSnap => {
                if (libro == libroSnap.val().titulo) {
                  idLibroEliminar = libroSnap.key;
                }
                return false;
              });
            });

            this.libroRef.child(idLibroEliminar).remove().then(mensaje=>{
              this.mensaje.create({
                message: "Libro eliminado",
                duration: 2000
              }).present();
            })
          }
        }
      ]
    });
    alert.present();
  }

}
