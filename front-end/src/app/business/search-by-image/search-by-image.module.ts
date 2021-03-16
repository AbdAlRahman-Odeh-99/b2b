import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { SearchByImageRoutingModule } from './search-by-image-routing.module';
import { SearchByImageComponent } from './search-by-image.component';
import { SharedModule } from '@app/shared/shared.module';
@NgModule({
  declarations: [SearchByImageComponent],
  imports: [
    CommonModule,
    SearchByImageRoutingModule,
    IonicModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class SearchByImageModule { }
