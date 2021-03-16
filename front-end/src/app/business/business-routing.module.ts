import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { BusinessComponent } from './business.component';
import { AuthGuard } from '@app/core/guards/auth/auth.guard';
import { BusinessRoutingConstants } from '@app/core/constants/routes';

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: BusinessRoutingConstants.STORE,
      },
      // {
      //   path: 'home',
      //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      // },
      {
        path: BusinessRoutingConstants.STORE,
        loadChildren: () =>
          import('./stores/stores.module').then((m) => m.StoresModule),
      },
      {
        path: BusinessRoutingConstants.PRODUCTS,
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: BusinessRoutingConstants.SEARCH_BY_IMAGE,
        loadChildren: () =>
          import('./search-by-image/search-by-image.module').then(
            (m) => m.SearchByImageModule
          ),
      },
      {
        path: BusinessRoutingConstants.OFFERS,
        loadChildren: () =>
          import('./offers/offers.module').then((m) => m.OffersModule),
      },
      {
        path: BusinessRoutingConstants.SETTINGS,
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: BusinessRoutingConstants.SHOPPING_CARD,
        loadChildren: () =>
          import('./shopping-card/shopping-card.module').then(
            (m) => m.ShoppingCardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: BusinessRoutingConstants.CHAT,
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
        canActivate: [AuthGuard],
      },
      {
        path: BusinessRoutingConstants.MY_STORES,
        loadChildren: () =>
          import('./all-my-stores/all-my-stores.module').then(
            (m) => m.AllMyStoresModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: BusinessRoutingConstants.MY_CARS,
        loadChildren: () =>
          import('./my-cars/my-cars.module').then((m) => m.MyCarsModule),
        canActivate: [AuthGuard],
      },
      {
        path: BusinessRoutingConstants.COMPLAINTS,
        loadChildren: () =>
          import('./complaints/complaints.module').then(m => m.ComplaintsModule),
        canActivate: [AuthGuard],
      },
      {
        path: BusinessRoutingConstants.ADMIN,
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
      },
      {
        path: BusinessRoutingConstants.SEARCH,
        loadChildren: () =>
        import('./search-result/search-result.module').then(m => m.SearchResultModule),
      },
      { path: 'sos', loadChildren: () => import('./sos/sos.module').then(m => m.SosModule) },
      { path: BusinessRoutingConstants.SOS, loadChildren: () => import('./sos/sos.module').then(m => m.SosModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule { }
