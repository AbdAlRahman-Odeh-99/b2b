import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchByImageComponent } from "./search-by-image.component";

const routes: Routes = [{ path: '', component: SearchByImageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchByImageRoutingModule { }
