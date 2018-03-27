import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private logService: LoginServicio,
    private loadingCtrl: LoadingController, ) {

    this.email = this.navParams.get('email')

  }



  async logOut() {
    await this.logService.logout();
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "!Hasta Luego! Regresa Pronto"
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.setRoot(HomePage);
      loading.dismiss();
    }, 1000)

  }

  openPage(pagina: string) {
    console.log(pagina);
    this.navCtrl.push(pagina, { email: this.email });
  }

}
