import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaRegistroPage } from './pagina-registro';

@NgModule({
  declarations: [
    PaginaRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaRegistroPage),
  ],
})
export class PaginaRegistroPageModule {}
