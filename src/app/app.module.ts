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
import { AdministradorPage} from '../pages/administrador/administrador';



@NgModule({
  declarations: [
    MyApp,
   HomePage,
   SesionPage,
   AdministradorPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MensajeServicio,
    LoginServicio,
    MejoraContraseñaServicio,
    
  ]
})
export class AppModule { }
