import { Injectable } from '@angular/core'
import { ToastController } from 'ionic-angular';

@Injectable()
export class MensajeServicio{
    constructor( private mensajectrl: ToastController){ }

    show(message: string, duration: number = 2000 ){

        return this.mensajectrl.create({
            message,
            duration,
        }).present();
    }
}