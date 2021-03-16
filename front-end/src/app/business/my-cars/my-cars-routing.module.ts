import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCarsComponent } from './my-cars.component';

const routes: Routes = [{ path: '', component: MyCarsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCarsRoutingModule { }
