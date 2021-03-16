import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
// import { SwPush } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly VAPID_PUBLIC_KEY = "BKUYYDI-m-U6MHCs4k30yvVZQwK5_cVNJr07SzdnbIWELB8DU4zsoDUpBm9vT1W8uwPlfW9tuTEmsMDyd89TVyk";
  textDir = 'rtl';
  listenTranslate: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private router: Router
    // private swPush: SwPush,
  ) {
    this.initializeApp();
    // console.log(this.swPush.isEnabled)
    // navigator.serviceWorker.ready.then(function(reg) {
    //   this.subscribeToNotifications();
    //   reg.pushManager.getSubscription().then(function(subscription) {

    //     subscription.unsubscribe().then(function(successful) {
    //       console.log(successful)
    //       // You've successfully unsubscribed
    //     }).catch(function(e) {
    //       // Unsubscription failed
    //     })
    //   })
    // });
    
    this.listenTranslate = this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      //window.location.reload(true);
      const prev = this.router.url;
      this.router.navigate(['/']).then(data => {
        this.router.navigate([prev]);

        if(event.lang == 'ar') {
        this.textDir = 'rtl';
        } 
        else {
        this.textDir = 'ltr';
        }

        
      });

      
    });
  }
  ngOnDestroy(): void {
    this.listenTranslate.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }

  subscribeToNotifications() {
  }

  //   this.swPush.requestSubscription({
  //     serverPublicKey: this.VAPID_PUBLIC_KEY
  //   })
  //     .then(sub => console.log(sub))
  //     .catch(err => console.error("Could not subscribe to notifications", err));
  // }
}
