import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html',
})
export class SesionPage {

  public libros: Array<any> = [];
  public usuarios: Array<any> = [];
  public email: string;
  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  public pedidoRef: firebase.database.Reference = firebase.database().ref('/pedidos');
  public usuRef: firebase.database.Reference = firebase.database().ref('/administradores');

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private mensaje: ToastController,
    private logOutService: LoginServicio,
    private menu: MenuController,
    private loadingCtrl: LoadingController,
  ) {
    menu.enable(true);
    this.email = navParams.get('email');
    console.log(this.email);
  }

  ionViewDidLoad() {

    this.initializeItems();
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

  openPage(pagina: string){
    console.log(pagina);
    this.navCtrl.push(pagina,{email:this.email});
  }
  getItems(ev) {

    this.initializeItems();

    var val = ev.target.value;

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
            idLibroPedido = libroSnap.key;
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
      })

      cantidad = (cantidad - 1);
      console.log(cantidad);

      const libroReference: firebase.database.Reference = firebase.database().ref(`/libros/` + idLibroPedido);
      libroReference.update({
        cantidad
      });
      idLibroPedido = "";

    } else {

      this.mensaje.create({
        message: 'No tenemos libros en existencia, intenta mas tarde',
        duration: 2000,
        position: 'middle'
      }).present();

    }

  }

  asignarLibros(autorPedido: string, tituloPedido: string, libroImagenPedido: string) {
    
    var idUsuario;

    this.usuRef.on('value', usuarioSnapshot => {
      usuarioSnapshot.forEach(usuSnap => {
        if(this.email == usuSnap.val().email){
          idUsuario = usuSnap.key
        }
        return false;
      });
    });

    console.log(idUsuario)
    const usuarioReference: firebase.database.Reference = firebase.database().ref(`/administradores/` + idUsuario + '/misLibros');
    usuarioReference.push({autorPedido,tituloPedido,libroImagenPedido});
  }


  async logOut() {
    await this.logOutService.logout();
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "!Hasta Luego! Regresa Pronto"
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.setRoot(HomePage);
      loading.dismiss();
    }, 2000)

  }
}
