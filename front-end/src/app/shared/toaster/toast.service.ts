import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  public async presentToastWithOptions(type: string, message: string, color, cb?: any) {
    const toast = await this.toastController.create({
      header: type,
      message,
      color,
      position: 'top',
      duration: 5000,
      buttons: [ {
          text: 'X',
          role: 'cancel',
          handler: () => cb,
        }
      ]
    });
    toast.present();
  }

}
