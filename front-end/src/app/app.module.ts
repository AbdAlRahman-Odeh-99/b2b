import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { TranslateModule } from '@ngx-translate/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import { environment } from '../environments/environment';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { QuicklinkModule } from 'ngx-quicklink';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    QuicklinkModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    CoreModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    SplashScreen,
    OneSignal,
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    /* translate.setDefaultLang('en');
    translate.use('en'); */
    if (localStorage.getItem('language') === null) {
      localStorage.setItem('language', 'en');
      translate.setDefaultLang('en');
    }

    translate.use(localStorage.getItem('language'));


    if (localStorage.getItem('darkMode') === null) {
      localStorage.setItem('darkMode', 'disabled')
    }
    else if (localStorage.getItem('darkMode') === 'enabled' && document.body.className === '') {
      document.body.classList.toggle('dark');
    }

    /* if(localStorage.getItem('darkMode') === 'disabled'){
      this.darkMode = false;
    }
    else if(localStorage.getItem('darkMode') === 'enabled'){
      document.body.classList.toggle('dark');
      this.darkMode = true;
    } */


  }

}
platformBrowserDynamic().bootstrapModule(AppModule);
