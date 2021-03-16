import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CardComponent } from './card/card.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    // LoadingComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    // LoadingComponent
  ]
})
export class SharedModule { }
