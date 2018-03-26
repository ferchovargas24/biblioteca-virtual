import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EliminarLibroPage } from './eliminar-libro';

@NgModule({
  declarations: [
    EliminarLibroPage,
  ],
  imports: [
    IonicPageModule.forChild(EliminarLibroPage),
  ],
})
export class EliminarLibroPageModule {}
