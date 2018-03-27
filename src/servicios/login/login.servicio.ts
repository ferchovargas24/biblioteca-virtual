import { Injectable } from '@angular/core'
import { Usuario } from '../../app/Models/User/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';

@Injectable()
export class LoginServicio {

    public usuRef: firebase.database.Reference = firebase.database().ref('/administradores');
    public isLogged: boolean;
    public isAdmin: boolean;
    public isRegistered: boolean;
    public iterador: number;
    public usuarios: Array<any> = [];

    constructor(private afauth: AngularFireAuth, private mensaje: ToastController
    ) { }


    llenarUsuarios() {

        this.usuRef.on('value', usuarioSnapshot => {
            this.usuarios = [];
            usuarioSnapshot.forEach(usuSnap => {
                this.usuarios.push(usuSnap.val());
                return false;
            });
        });
    }

    async register(usuario: Usuario) {

        await this.afauth.auth.createUserWithEmailAndPassword(usuario.email, usuario.pass).then(evento => {

            this.mensaje.create({
                message: `Registrado ${usuario.email}`,
                duration: 3000
            }).present();
            this.isRegistered = true;

        }).catch((FirebaseError) => {
            this.isRegistered = false;
            this.mensaje.create({
                message: `Ya esta registrado el usuario`,
                duration: 3000
            }).present();
        });
    }

    async registrarEnBase(usuario: Usuario, administrador: boolean) {
        var admin;
        var email = usuario.email;
        var pass = usuario.pass;

        setTimeout(() => {
            console.log(this.isRegistered)
            if (this.isRegistered == true) {

                if (administrador == true) {
                    admin = 1;
                    this.usuRef.push({ email, pass, admin });
                }else{
                    admin=0;
                    this.usuRef.push({ email, pass, admin });
                }
            }
        }, 1000);
    }

    logout() {
        this.afauth.auth.signOut();
        this.isLogged = false;
        this.isAdmin = false;
    }


    async loginUser(usuario: Usuario) {
        
        this.llenarUsuarios();

        setTimeout(() => {
            this.afauth.auth.signInWithEmailAndPassword(usuario.email, usuario.pass)
                .then(evento => {

                    console.log(usuario.email);
                    console.log(usuario.pass);

                }).catch((FirebaseAuthException) => {
                    this.isLogged = false;
                    console.log(this.isLogged);
                });
        }, 2000)

        setTimeout(() => {
            for (this.iterador = 0; this.iterador < this.usuarios.length; this.iterador++) {
                var numero1 = this.usuarios[this.iterador];
    
                if (numero1.email == usuario.email && numero1.pass == usuario.pass) {
    
                    if (numero1.admin == 1) {
                        this.isLogged = true;
                        this.isAdmin = true;
                        console.log(this.isAdmin);
    
                    } else {
                        this.isLogged = true;
                        this.isAdmin = false;
                        console.log(this.isAdmin);
    
                    }
    
                }
    
            }
        }, 1000);
 

    };

    continuingLogin() {

        console.log('hola')
    }
}