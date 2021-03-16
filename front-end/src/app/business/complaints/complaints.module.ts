import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsComponent } from './complaints.component';
import { ComplaintsService } from './service/complaints.service';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [ComplaintsComponent],
  imports: [
    CommonModule,
    ComplaintsRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    TranslateModule.forChild()
  ],
  providers: [
    ComplaintsService,
    IonicModule
  ]
})
export class ComplaintsModule { }
