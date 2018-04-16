import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-eliminar-libro-de-base',
  templateUrl: 'eliminar-libro-de-base.html',
})
export class EliminarLibroDeBasePage {

  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  libros: Array<any> = [];
  libro;
  isEnabled: boolean =false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private mensaje: ToastController,
    private actionSheetCtrl : ActionSheetController) {
  }

  ionViewDidLoad() {
    this.llenarLibros();
  }

  llenarLibros() {
    this.libroRef.on('value', libroSnapshot => {
      this.libros=[];
      libroSnapshot.forEach(libroSnap => {
        this.libros.push(libroSnap.val().titulo)
        return false;
      });
    });
  }
  

  habilitaBoton(){
    this.isEnabled=true;
  }
  mostrarOpciones(libro) {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Que quieres hacer?',
      buttons: [
        {
          text: 'Borrar Libro',
          role: 'destructive',
          handler: () => {
            this.eliminarLibro(libro);
          }
        },{
          text: 'Actualizar libro',
          handler: () => {
            this.libro = libro;
            this.actualizarLibro();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  actualizarLibro(){
    this.navCtrl.push("ActualzarLibroPage",{libro: this.libro});
  }

  eliminarLibro(libro) {

    var idLibroEliminar;

    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: '¿Quieres eliminar el libro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
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

            this.libroRef.child(idLibroEliminar).remove().then(mensaje => {
              this.mensaje.create({
                message: "Libro eliminado",
                duration: 2000
              }).present();
            })
            this.llenarLibros();
          }
        }
      ]
    });
    alert.present();
  }

}
