import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-actualzar-libro',
  templateUrl: 'actualzar-libro.html',
})
export class ActualzarLibroPage {

  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  libros: Array<any> = [];
  libro;
  cantidad;
  imagen;
  idLibroActualizar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private mensaje: ToastController) {
      this.libro = this.navParams.get('libro');
  }

  ionViewDidLoad() {

    this.libroRef.on('value', libroSnapshot => {
      libroSnapshot.forEach(libroSnap => {
        if (this.libro == libroSnap.val().titulo) {
          this.idLibroActualizar = libroSnap.key;
          this.cantidad = libroSnap.val().cantidad;
          this.imagen = libroSnap.val().imagen;
        }
        return false;
      });
    });
  }

  actualizarLibro(cantidadNueva , imagenNueva) {

    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: '¿Quieres actualizar el libro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: () => {
            var cantidad = cantidadNueva;
            var imagen = imagenNueva;
            this.libroRef.child(this.idLibroActualizar).update({
              cantidad,
              imagen
            }).then(mensaje => {
              this.mensaje.create({
                message: "Libro actualizado",
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
