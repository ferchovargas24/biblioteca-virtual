import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pagina-reg-libro',
  templateUrl: 'pagina-reg-libro.html',
})
export class PaginaRegLibroPage {

  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  imagenNuevo: AbstractControl;
  tituloNuevo: AbstractControl;
  autorNuevo: AbstractControl;
  cantidadNuevo: AbstractControl;
  formgroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private mensaje: ToastController,
    public fb: FormBuilder) {

      this.formgroup = fb.group({
        autorNuevo: ['', Validators.required],
        imagenNuevo: ['', Validators.required],
        cantidadNuevo:['',Validators.required],
        tituloNuevo:['',Validators.required]
      });
  
  
      this.autorNuevo = this.formgroup.controls['autorNuevo'];
      this.imagenNuevo = this.formgroup.controls['imagenNuevo'];
      this.tituloNuevo = this.formgroup.controls['tituloNuevo'];
      this.cantidadNuevo = this.formgroup.controls['cantidadNuevo'];
  }


  createBook(autor: string, titulo: string, imagen: string, cantidad: number): void {
    this.libroRef.push({ autor, titulo, imagen, cantidad }).then(evento => {
      this.mensaje.create({
        message: 'Se ha guargado el nuevo libro con titulo: , ' + titulo,
        duration: 3000,
        position: 'middle'
      }).present();
    });
  }

}
