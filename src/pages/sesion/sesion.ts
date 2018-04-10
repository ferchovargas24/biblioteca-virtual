import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { HomePage } from '../home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { BackgroundMode } from '@ionic-native/background-mode';

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
  Fecha2 = new Date();
  idUsuario;
  public libroRef: firebase.database.Reference = firebase.database().ref('/libros');
  public pedidoRef: firebase.database.Reference = firebase.database().ref('/pedidos');
  public usuRef: firebase.database.Reference = firebase.database().ref('/administradores');

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private mensaje: ToastController,
    private logOutService: LoginServicio,
    private loadingCtrl: LoadingController,
    private notificacion: LocalNotifications,
    private notificando: PhonegapLocalNotification,
    private backGround : BackgroundMode
  ) {

    this.email = navParams.get('email');
  }

  ionViewDidLoad() {

    this.initializeItems();
    this.backGround.enable();
    var dia = this.Fecha.getDate();
    var mes = this.Fecha.getMonth() + 1;
    if (mes < 10) { mes = <any>('0' + mes) };
    if (dia < 10) { dia = <any>('0' + dia) };
    this.Fecha.setDate(dia + 1);
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
    this.navCtrl.push(pagina, { email: this.email });
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

    var idLibroPedido;

    if (cantidad > 0) {

      this.llenarMisLibros();
      for (this.iterador = 0; this.iterador < this.misLibros.length; this.iterador++) {
        var tituloArreglo = this.misLibros[this.iterador];
        console.log(tituloArreglo);
        if (tituloArreglo.tituloPedido == tituloPedido) {
          var tituloQueSeTiene = tituloArreglo.tituloPedido;
        }
      }

      console.log(tituloQueSeTiene)

      if (tituloQueSeTiene == tituloPedido) {
        this.mensaje.create({
          message: "Ya tienes este titulo rentado",
          position: 'middle',
          duration: 3000
        }).present();


      } else {
        var currentEmail = this.email
        this.pedidoRef.push({ autorPedido, tituloPedido, libroImagenPedido, currentEmail }).then(evento => {

          var fechaRentado = new Date();
          var dia = fechaRentado.getDate();
          var mes = fechaRentado.getMonth() + 1;
          var anio = fechaRentado.getFullYear();
          var diaEntrega = this.Fecha.getDate();
          console.log(this.Fecha.getDate());
          if (mes < 10) { mes = <any>('0' + mes) };
          if (dia < 10) { dia = <any>('0' + dia) };
          const usuarioReference: firebase.database.Reference = firebase.database().ref(`/administradores/` + this.idUsuario + '/misLibros');
          usuarioReference.push({ autorPedido, tituloPedido, libroImagenPedido, dia, mes, anio, diaEntrega });

          this.mensaje.create({
            message: 'Gracias por tu solicitud, pronto te llegara una notificación con el título pedido',
            duration: 2000,
            position: 'middle'
          }).present();

          var idIncrement;

          this.notificando.requestPermission().then(permiso=>{
            if (permiso =='granted') {
              this.notificando.create('Aviso', {
                tag: 'Nueva petición',
                body: 'Has solicitado: ' + tituloPedido,
                icon: 'https://thumbs.dreamstime.com/b/icono-o-s%C3%ADmbolo-de-los-libros-6649973.jpg'
              });

            }
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
        content: "¡Hasta Luego! Regresa Pronto"
      });
      loading.present();

      setTimeout(() => {
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }, 2000)

    }

    add_reminder() {

      this.llenarMisLibros();
      var horas = this.Fecha.getHours();
      var minutos = this.Fecha.getMinutes();


      if (horas < 10) { horas = <any>('0' + horas) };
      if (minutos < 10) { minutos = <any>('0' + minutos) };
      console.log(this.Fecha.getDate());

      console.log(this.misLibros)

      for (this.iterador = 0; this.iterador < this.misLibros.length; this.iterador++) {
        var tituloArreglo = this.misLibros[this.iterador];

        if (((tituloArreglo.diaEntrega - (this.Fecha.getDate() - 1)) == 1) && tituloArreglo.mes == (this.Fecha.getMonth() + 1) && tituloArreglo.anio == this.Fecha.getFullYear()) {
          console.log("ya regresalos")

          
          this.notificando.requestPermission().then(permiso =>{
            if(permiso == 'granted'){
              this.notificando.create('Recordatorio',{
                tag: "iterador",
                dir:"auto",
                body: "Queda 1 día a entregar:" + tituloArreglo.tituloPedido, 
                icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Antu_appointment-reminder.svg/2000px-Antu_appointment-reminder.svg.png',

              });
            }
          })
            
          

        } else {
          if (((tituloArreglo.diaEntrega - (this.Fecha.getDate() - 1)) <= 0) && tituloArreglo.mes == (this.Fecha.getMonth() + 1) && tituloArreglo.anio == this.Fecha.getFullYear()) {
            console.log("Se agotó el tiempo")
            this.notificando.requestPermission().then(permiso =>{
              if(permiso == 'granted'){
                this.notificando.create('Recordatorio',{
                  tag: "Se harán cargos adicionales",
                  body: "Se agotó el tiempo para entregar:" + tituloArreglo.tituloPedido, 
                  icon: 'https://icon-icons.com/icons2/1302/PNG/512/dangersign_85806.png',
  
                });
              }
            })
            
          }
        }


      }
    }
  }
