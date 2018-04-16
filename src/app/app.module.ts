import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { FireBase_Config } from './firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { MyApp } from './app.component';
import { MensajeServicio } from '../servicios/mensaje/mensaje.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginServicio } from '../servicios/login/login.servicio';
import { MejoraContraseñaServicio } from '../servicios/mensaje/mejoraContrase\u00F1a';
import { HomePage } from '../pages/home/home';
import { SesionPage } from '../pages/sesion/sesion';
import { AdministradorPage } from '../pages/administrador/administrador';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Keyboard } from '@ionic-native/keyboard';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { Cordova } from '@ionic-native/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PaginaRegistroPage } from '../pages/pagina-registro/pagina-registro';
import { PaginaRegLibroPage } from '../pages/pagina-reg-libro/pagina-reg-libro';
import { EliminarLibroDeBasePage } from '../pages/eliminar-libro-de-base/eliminar-libro-de-base';
import { EliminarLibroPage } from '../pages/eliminar-libro/eliminar-libro';
import { HistorialpedidosPage } from '../pages/historialpedidos/historialpedidos';
import { LibrosGuardadosPage } from '../pages/libros-guardados/libros-guardados';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SesionPage,
    AdministradorPage,
    PaginaRegistroPage,
    PaginaRegLibroPage,
    EliminarLibroDeBasePage,
    EliminarLibroPage,
    HistorialpedidosPage,
    LibrosGuardadosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(FireBase_Config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SesionPage,
    AdministradorPage,
    PaginaRegistroPage,
    PaginaRegLibroPage,
    EliminarLibroDeBasePage,
    EliminarLibroPage,
    HistorialpedidosPage,
    LibrosGuardadosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MensajeServicio,
    LoginServicio,
    MejoraContraseñaServicio,
    LocalNotifications,
    Keyboard,
    PhonegapLocalNotification,
    AndroidPermissions,
    BackgroundMode
  ]
})
export class AppModule { }

