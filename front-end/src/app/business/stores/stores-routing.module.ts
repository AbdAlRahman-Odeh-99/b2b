import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresRoutingConstants } from '@app/core/constants/routes';
import { StoresComponent } from './stores.component';
// import { StoreInfoPage } from './store-info/store-info.page';

const routes: Routes = [
  {
    path: '',
    component: StoresComponent,
    // children: [
    //  ,
    // ],
  },
  {
    path: StoresRoutingConstants.INFO,
    loadChildren: () => import('./info/info.module').then((m) => m.InfoModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
