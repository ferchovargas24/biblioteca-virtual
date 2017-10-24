import { Injectable } from '@angular/core'
import { Usuario } from '../../app/Models/User/user.model';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ListaUsuariosServicio {

    constructor(private afauth: AngularFireAuth,
    ) { }

    async addUser(usuario: Usuario) {
        try {
            const result = await this.afauth.auth.createUserWithEmailAndPassword(usuario.email, usuario.pass);
        } catch (e) {
            console.error(e);
        }
    }
}