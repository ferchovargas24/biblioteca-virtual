import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl : AlertController) {
  }

  info(){
    
      let alert = this.alertCtrl.create({
        title: 'Equipo',
        subTitle: 'Rocha Vargas José Fernando (Programador) ' + '\n Pichardo Aguilar Jorge (Investigador)',
        buttons: ['OK']
      });
      alert.present();
    
  
  }
}
