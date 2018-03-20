import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisLibrosPage } from './mis-libros';

@NgModule({
  declarations: [
    MisLibrosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisLibrosPage),
  ],
})
export class MisLibrosPageModule {}
