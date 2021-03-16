import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    path: 'info',
    loadChildren: () => import('./info/info.module').then((m) => m.InfoModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
