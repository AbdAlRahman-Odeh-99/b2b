import { SearchBarComponent } from './search-bar/search-bar.component';
import { ShowHidePasswordComponent } from './Show-Hide-Password/Show-Hide-Password.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CardComponent } from './card/card.component';
import { LoadingComponent } from './loading/loading.component';
import { FiltersComponent } from './filters/filters.component';
import { RouterModule } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { ToastService } from './toaster/toast.service';
import { MapComponent } from './map/map.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { AgmCoreModule } from '@agm/core';
import { InputErrorMessageComponent } from './input-error-message/input-error-message.component';

@NgModule({
  imports: [
  CommonModule,
    IonicModule,
    RouterModule,
    TranslateModule.forChild(),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyANjVs1r0V8ZriyH83yKQsNuZpY14UourY'
    // })
  ],
  declarations: [
    LoadingComponent,
    CardComponent,
    FiltersComponent,
    ViewProductComponent,
    UploadImageComponent,
    NoDataFoundComponent,
    ShowHidePasswordComponent,
    MapComponent,
    SearchBarComponent,
    InputErrorMessageComponent,
  ],
  providers:[
    Geolocation,
    NativeGeocoder,
  ],
  exports: [
    LoadingComponent,
    CardComponent,
    FiltersComponent,
    ViewProductComponent,
    UploadImageComponent,
    NoDataFoundComponent,
    ShowHidePasswordComponent,
    MapComponent,
    SearchBarComponent,
    InputErrorMessageComponent,
  ]
})

export class SharedModule { }
