import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaRegLibroPage } from './pagina-reg-libro';

@NgModule({
  declarations: [
    PaginaRegLibroPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaRegLibroPage),
  ],
})
export class PaginaRegLibroPageModule {}
