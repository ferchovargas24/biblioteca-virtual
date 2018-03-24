import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { HomePage } from '../home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html',
})
export class SesionPage {

  public libros: Array<any> = [];
  public usuarios: Array<any> = [];
  public misLibros: Array<any> = [];
  public email: string;
  iterador: number;
  Fecha = new Date();
  public fechaEntrega;
  idUsuario;
  public isAble: boolean;
  public isInUse: boolean = false;
  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  public pedidoRef: firebase.database.Reference = firebase.database().ref('/pedidos');
  public usuRef: firebase.database.Reference = firebase.database().ref('/administradores');

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private mensaje: ToastController,
    private logOutService: LoginServicio,
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private localNotifications: LocalNotifications
  ) {

    this.email = navParams.get('email');
  }

  ionViewDidLoad() {

    this.initializeItems();
    this.llenarMisLibros();
    var dia = this.Fecha.getDate();
    var mes = this.Fecha.getMonth() + 1;
    if (mes < 10) { mes = <any>('0' + mes) };
    if (dia < 10) { dia = <any>('0' + dia) };
    this.Fecha.setDate(dia + 1);
    this.fechaEntrega = this.Fecha.getDate() + "/" + mes + "/" + this.Fecha.getFullYear()
    this.add_reminder();
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

  openPage(pagina: string) {
    this.navCtrl.push(pagina, { email: this.email, fechaEntrega: this.fechaEntrega });
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

  llenarMisLibros() {


    this.usuRef.on('value', usuarioSnapshot => {
      usuarioSnapshot.forEach(usuSnap => {

        if (this.email == usuSnap.val().email) {
          this.idUsuario = usuSnap.key
        }
        return false;
      });
    });


    const usuarioReference: firebase.database.Reference = firebase.database().ref(`/administradores/` + this.idUsuario + '/misLibros');

    usuarioReference.on('value', libroSnapshot => {
      this.misLibros = [];
      libroSnapshot.forEach(libroSnap => {
        this.misLibros.push(libroSnap.val());
        return false;
      });
    });
  }

  asignarLibros(autorPedido: string, tituloPedido: string, libroImagenPedido: string, cantidad: number) {

    var idUsuario;
    var idLibroPedido;

    if (cantidad > 0) {

      for (this.iterador = 0; this.iterador < this.misLibros.length; this.iterador++) {
        var tituloArreglo = this.misLibros[this.iterador];
        console.log(tituloArreglo);
        if (tituloArreglo.tituloPedido == tituloPedido) {
          var tituloQueSeTiene = tituloArreglo.tituloPedido;
          var diaRenta = tituloArreglo.dia;
        }
      }

      if (tituloQueSeTiene == tituloPedido) {
        this.mensaje.create({
          message: "Ya tienes este titulo rentado",
          position: 'middle',
          duration: 3000
        }).present();


      } else {

        this.pedidoRef.push({ autorPedido, tituloPedido, libroImagenPedido }).then(mensaje => {

          var fechaRentado = new Date();
          var dia = fechaRentado.getDate();
          var mes = fechaRentado.getMonth() + 1;
          var anio = fechaRentado.getFullYear();
          if (mes < 10) { mes = <any>('0' + mes) };
          if (dia < 10) { dia = <any>('0' + dia) };
          const usuarioReference: firebase.database.Reference = firebase.database().ref(`/administradores/` + this.idUsuario + '/misLibros');
          usuarioReference.push({ autorPedido, tituloPedido, libroImagenPedido, dia, mes, anio });
          var idIncrement;
          this.localNotifications.schedule({
            id: idIncrement++,
            title: 'Nueva solicitud',
            text: 'Has solicitado el libro: ' + tituloPedido + " Recuerda recogerlo en tu campus lo antes posible",
            sound: null,
            icon: 'https://png.icons8.com/ios/1600/book-stack.png'
          });
        })

        this.libroRef.on('value', libroSnapshot => {
          libroSnapshot.forEach(libroSnap => {

            if (tituloPedido == libroSnap.val().titulo) {
              idLibroPedido = libroSnap.key;
            }

            return false;
          });
        });
        cantidad = (cantidad - 1);
        const libroReference: firebase.database.Reference = firebase.database().ref(`/libros/` + idLibroPedido);
        libroReference.update({
          cantidad
        });
      }

    } else {
      this.mensaje.create({
        message: 'No tenemos libros en existencia, intenta mas tarde',
        duration: 2000,
        position: 'middle'
      }).present();

    }
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

  add_reminder() {

    var d = 0;

    var horas = this.Fecha.getHours();
    var minutos = this.Fecha.getMinutes();


    if (horas < 10) { horas = <any>('0' + horas) };
    if (minutos < 10) { minutos = <any>('0' + minutos) };
    console.log(this.Fecha.getDate());

    console.log(this.misLibros)

    for (this.iterador = 0; this.iterador < this.misLibros.length; this.iterador++) {
      var tituloArreglo = this.misLibros[this.iterador];

      if (((this.Fecha.getDate() - tituloArreglo.dia) <= 1)) {
        console.log("ya regresalos")
        var diasRestantes = this.Fecha.getDate() - tituloArreglo.dia;
        console.log("Ya hay que regresarlos" + diasRestantes)
        this.localNotifications.schedule({
          id: this.iterador,
          title: "Devuelve el libro a tiempo, evita cargos adicionales",
          text: "Te quedan: " + diasRestantes + " días," + tituloArreglo.tituloPedido,
          icon: 'https://es.seaicons.com/wp-content/uploads/2015/10/Books-2-icon.png',
          smallIcon: 'https://es.seaicons.com/wp-content/uploads/2015/10/Books-2-icon.png'
        });

      }
    }
  }
}
