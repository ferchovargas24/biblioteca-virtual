import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Nav } from 'ionic-angular';
import { LoginServicio } from '../../servicios/login/login.servicio';
import { HomePage } from '../home/home';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PaginaRegistroPage } from '../pagina-registro/pagina-registro';
import { PaginaRegLibroPage } from '../pagina-reg-libro/pagina-reg-libro';
import { EliminarLibroPage } from '../eliminar-libro/eliminar-libro';
import { HistorialpedidosPage } from '../historialpedidos/historialpedidos';
import { EliminarLibroDeBasePage } from '../eliminar-libro-de-base/eliminar-libro-de-base';
import { LibrosGuardadosPage } from '../libros-guardados/libros-guardados';


@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

  email: string;
  @ViewChild(Nav) nav: Nav;

  public paginas: Array<{ titulo: string, component: any, icon: string }>;
  paginaActiva;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private logService: LoginServicio,
    private loadingCtrl: LoadingController,
    private backGround: BackgroundMode) {

    this.email = this.navParams.get('email');
    this.paginas = [
      { titulo: 'Registrar usuario', component: PaginaRegistroPage, icon: 'ios-person-add-outline' },
      { titulo: 'Guardar libro', component: PaginaRegLibroPage, icon: 'ios-book-outline' },
      { titulo: 'Galeria de Libros', component: LibrosGuardadosPage, icon: 'ios-bookmark-outline' },
      { titulo: 'Entrega de libros', component: EliminarLibroPage, icon: 'ios-hand-outline' },
      { titulo: 'Historial de pedidos', component: HistorialpedidosPage, icon: 'ios-list-outline' },
      { titulo: 'Dar de baja y actualizar libros', component: EliminarLibroDeBasePage, icon: 'ios-trash-outline' },
      { titulo: 'Cerrar Sesión', component: null, icon: 'ios-log-out-outline' }
    ];
  }

  ionViewDidLoad() {
    this.backGround.enable();
  }

  async logOut() {
    await this.logService.logout();
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "¡Hasta Luego! Regresa Pronto"
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.setRoot(HomePage);
      loading.dismiss();
    }, 1000)

  }

  abrirPagina(pagina) {
    console.log(pagina.component)
    if(pagina.titulo == 'Cerrar Sesión'){
      this.logOut();
    }else{
      this.nav.setRoot(pagina.component, { email: this.email });
      
    }
    this.paginaActiva = pagina.component;
  }

  paginaActivar(pagina) {
    return pagina == this.paginaActiva;
  }
}
