import { Injectable } from '@angular/core'
import { Usuario } from '../../app/Models/User/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';



@Injectable()
export class LoginServicio {

    constructor(private afauth: AngularFireAuth, private mensaje: ToastController,
       
    ) { }
    async loginUser(usuario: Usuario) {

        if (usuario.email ==null || usuario.pass ==null) {
            this.mensaje.create({
                message: `Por favor llena los espacios con informacion válida`,
                duration: 3000
            }).present();
        }else{
             this.afauth.auth.signInWithEmailAndPassword(usuario.email, usuario.pass)
            .then(evento => {

                this.mensaje.create({
                    message: `Bienvenido ${usuario.email}`,
                    duration: 3000
                }).present();

            })
            .catch((FirebaseAuthException) => {
                this.mensaje.create({
                    message: ` ${FirebaseAuthException}`,
                    duration: 3000
                }).present();
            });
        }


    }
}