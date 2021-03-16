import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SosComponent } from './sos.component';

const routes: Routes = [{ path: '', component: SosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SosRoutingModule { }
