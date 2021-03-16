import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastService } from '@app/shared/toaster/toast.service';

@Injectable()
export class MapService {
  latitude: number;
  longitude: number;

  constructor(
    private geolocation: Geolocation,
    private toastService: ToastService
  ) {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      this.toastService.presentToastWithOptions('error', 'Error getting location', 'danger');
      console.log('Error getting location', error);
    });
  }

  getLatAndLong(): any {
    return { lat: this.latitude, long: this.longitude };
  }
}
