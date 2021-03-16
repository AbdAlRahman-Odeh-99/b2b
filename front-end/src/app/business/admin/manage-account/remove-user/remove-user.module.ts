import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoveUserRoutingModule } from './remove-user-routing.module';
import { RemoveUserComponent } from './remove-user.component';


@NgModule({
  declarations: [RemoveUserComponent],
  imports: [
    CommonModule,
    RemoveUserRoutingModule
  ]
})
export class RemoveUserModule { }
