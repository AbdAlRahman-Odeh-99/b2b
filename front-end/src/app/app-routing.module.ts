import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';


export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/business',
    pathMatch: 'full'
  },
  {
    path: 'business',
    loadChildren: './business/business.module#BusinessModule',
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  // { path: 'all-my-stores', loadChildren: () => import('./business/all-my-stores/all-my-stores.module').then(m => m.AllMyStoresModule) },
  
  // { path: 'my-store', loadChildren: () => import('./business/my-store/my-store.module').then(m => m.MyStoreModule) },
  // { path: 'stores', loadChildren: () => import('./business/stores/stores.module').then(m => m.StoresModule) },
  // { path: 'info', loadChildren: () => import('./business/stores/info/info.module').then(m => m.InfoModule) },
  // { path: 'categories', loadChildren: () => import('./business/categories/categories.module').then(m => m.CategoriesModule) },
  // { path: 'offers', loadChildren: () => import('./business/offers/offers.module').then(m => m.OffersModule) },
  // { path: 'shopping-card', loadChildren: () => import('./business/shopping-card/shopping-card.module').then(m => m.ShoppingCardModule) },
  // { path: 'settings', loadChildren: () => import('./business/settings/settings.module').then(m => m.SettingsModule) },
  // { path: 'products', loadChildren: () => import('./business/products/products.module').then(m => m.ProductsModule) },
  // {
  //   path: 'search-by-image', loadChildren: () => import('./business/search-by-image/search-by-image.module')
  //     .then(m => m.SearchByImageModule)
  // },
  // { path: 'chat', loadChildren: () => import('./business/chat/chat.module').then(m => m.ChatModule) },
];

@NgModule({
  imports: [
    // tslint:disable-next-line: max-line-length
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, paramsInheritanceStrategy: routingConfiguration.paramsInheritanceStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
