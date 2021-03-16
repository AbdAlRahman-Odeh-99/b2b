import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SearchByImageRoutingModule } from './search-by-image-routing.module';
import { SearchByImageComponent } from './search-by-image.component';


@NgModule({
  declarations: [SearchByImageComponent],
  imports: [
    CommonModule,
    SearchByImageRoutingModule,
    IonicModule
  ]
})
export class SearchByImageModule { }
