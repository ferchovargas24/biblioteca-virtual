import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LibrosGuardadosPage } from './libros-guardados';

@NgModule({
  declarations: [
    LibrosGuardadosPage,
  ],
  imports: [
    IonicPageModule.forChild(LibrosGuardadosPage),
  ],
})
export class LibrosGuardadosPageModule {}
