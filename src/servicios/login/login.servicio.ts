import { Injectable } from '@angular/core'
import { Usuario } from '../../app/Models/User/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { FirebaseAuth } from '@firebase/auth-types';


@Injectable()
export class LoginServicio {

    public usuRef: firebase.database.Reference = firebase.database().ref('/administradores');
    public isLogged: boolean;
    public isAdmin: boolean;
    public usuAd: number;
    public usuarios: Array<any> = [];

    constructor(private afauth: AngularFireAuth, private mensaje: ToastController,

    ) { }



    async register(usuario: Usuario) {

        await this.afauth.auth.createUserWithEmailAndPassword(usuario.email, usuario.pass).then(evento => {
            console.log(this.isLogged);
            this.mensaje.create({
                message: `Registrado ${usuario.email}`,
                duration: 3000
            }).present();

            this.usuRef.push(usuario);
        });
    }

    logout() {
        this.afauth.auth.signOut();
        this.isLogged = false;
    }

    async loginUser(usuario: Usuario) {

        

        this.afauth.auth.signInWithEmailAndPassword(usuario.email, usuario.pass)
            .then(evento => {

                this.isLogged = true;

                console.log(this.isLogged);
                this.mensaje.create({
                    message: `Bienvenido ${usuario.email}`,
                    duration: 3000
                }).present();

            }).catch((FirebaseAuthException) => {
                this.isLogged = false;
                console.log(this.isLogged);
            });
    };

    continuingLogin(){

        console.log('hola')
    }
}