import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@app/core/model/store';
import { StoresService } from '../../../service/stores.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ToastService } from '@app/shared/toaster/toast.service';

@Component({
  selector: 'app-about-store',
  templateUrl: './about-store.component.html',
  styleUrls: ['./about-store.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutStoreComponent implements OnInit {
  store: Store;
  storeId: string;
  isLoggedIn: boolean = false;
  userId: string;
  garageOwnerId: string;
  isInContact: boolean = false;

  constructor(
    private storesService: StoresService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.isLoggedIn = this.authService.loggedIn;
    if (this.isLoggedIn) {
      this.userId = this.authService.userInfo()._id;
    }

    this.activatedRoute.params.subscribe((params) => {
      this.storeId = params.id;
      this.storesService.getStoreById('stores', this.storeId).subscribe((res) => {
        this.garageOwnerId = res.userId;
        this.store = res;
        this.inContact();
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Write Complaint',
      inputs: [
        {
          name: 'message',
          type: 'textarea',
          placeholder: 'Message',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Send',
          handler: (data) => {
            console.log(data);
            this.storesService.writeComplaint(this.storeId, data)
              .subscribe(res => {
                this.toastService.presentToastWithOptions('success', 'Complaints sent successfully', 'success');
              });
          },
        },
      ],
    });
    await alert.present();
  }

  startChat() {
    this.storesService.startChat(this.garageOwnerId, this.store.name).subscribe((res) => {
      this.toastService.presentToastWithOptions('success', 'Contacts created successfully', 'success');
    });
  }

  inContact() {
    if (this.isLoggedIn) {
      this.storesService.inContact(this.garageOwnerId).subscribe((has: any) => {
        this.isInContact = has.has;
      });
    }
  }
  ngOnInit(): void {}
}
