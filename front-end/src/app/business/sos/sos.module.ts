import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SosRoutingModule } from './sos-routing.module';
import { SosComponent } from './sos.component';
import { SosService } from './service/sos.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [SosComponent],
  imports: [
    CommonModule,
    SosRoutingModule,
    IonicModule,
    SharedModule,
    InfiniteScrollModule,
    TranslateModule.forChild()
  ],
  providers: [
    SosService
  ]
})
export class SosModule { }
