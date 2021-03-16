import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
// import { promises } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly VAPID_PUBLIC_KEY = "BKUYYDI-m-U6MHCs4k30yvVZQwK5_cVNJr07SzdnbIWELB8DU4zsoDUpBm9vT1W8uwPlfW9tuTEmsMDyd89TVyk";

  constructor(private push: Push) {
    // const options: PushOptions = {
    //   android: {},
    //   ios: {
    //     alert: 'true',
    //     badge: true,
    //     sound: 'false'
    //   },
    //   windows: {},
    //   browser: {
    //     pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    //   }
    // }

    // const pushObject: PushObject = this.push.init(options);
    // pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    // pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

    this.triggerPushNotification().catch(error => console.error(error));
    self.addEventListener('push', (event: any) => {
      const data = event.data.json();
  
      // self.registration.showNotification(data.title, {
      //     body: 'Yay it works!',
      // });
  });
  }



  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


  async triggerPushNotification() {
    if ('serviceWorker' in navigator) {
      const register = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY),
      });

      await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Service workers are not supported in this browser');
    }
  }



  // hasPermission(): boolean | promises<any> {
  //   return this.push.hasPermission()
  // }

  // createChannel() {
  //   // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
  //   this.push.createChannel({
  //     id: "testchannel1",
  //     description: "My first test channel",
  //     // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
  //     importance: 3,
  //     //badge is used to if badge appears on the app icon see https://developer.android.com/reference/android/app/NotificationChannel.html#setShowBadge(boolean).
  //     //false = no badge on app icon.
  //     //true = badge on app icon
  //     badge: false
  //   }).then(() => console.log('Channel created'));
  // }

  // deleteChannel() {
  //   this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
  // }


}
