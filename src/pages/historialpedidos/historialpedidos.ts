import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-historialpedidos',
  templateUrl: 'historialpedidos.html',
})
export class HistorialpedidosPage {

  public pedidosRef: firebase.database.Reference = firebase.database().ref('/pedidos');
  pedidos: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.llenarPedidos();
  }

  llenarPedidos() {
    this.pedidosRef.on('value', libroSnapshot => {
      this.pedidos = [];
      libroSnapshot.forEach(libroSnap => {
        this.pedidos.push(libroSnap.val())
        return false;
      });
    });
  }

  getItems(ev) {

    this.llenarPedidos();

    var val = ev.target.value;

    if (val && val.trim() != ' ') {
      this.pedidos = this.pedidos.filter((libro) => {
        return ((libro.currentEmail.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (libro.tituloPedido.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
          (libro.autorPedido.toLowerCase().indexOf(val.toLowerCase()) > -1));
      });
    }
  }
}
