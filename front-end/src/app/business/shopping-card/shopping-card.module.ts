import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { ShoppingCardRoutingModule } from './shopping-card-routing.module';
import { ShoppingCardComponent } from './shopping-card.component';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ShoppingCardComponent],
  imports: [
    CommonModule,
    ShoppingCardRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class ShoppingCardModule { }
