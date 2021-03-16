import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingCardComponent } from './shopping-card.component';

const routes: Routes = [{ path: '', component: ShoppingCardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCardRoutingModule { }
