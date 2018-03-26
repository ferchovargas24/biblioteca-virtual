import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EliminarLibroDeBasePage } from './eliminar-libro-de-base';

@NgModule({
  declarations: [
    EliminarLibroDeBasePage,
  ],
  imports: [
    IonicPageModule.forChild(EliminarLibroDeBasePage),
  ],
})
export class EliminarLibroDeBasePageModule {}
