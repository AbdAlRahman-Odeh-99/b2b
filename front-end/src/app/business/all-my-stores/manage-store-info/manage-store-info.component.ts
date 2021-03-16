import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MyStoresService } from '../services/my-stores.service';
import { convertFrom24To12Hour } from '@app/shared/functions/convertTime';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/shared/toaster/toast.service';
import { ModalController } from '@ionic/angular';
import { ViewProductComponent } from '@app/shared/view-product/view-product.component';
import { MapComponent } from '@app/shared/map/map.component';

@Component({
  selector: 'app-add-store',
  templateUrl: './manage-store-info.component.html',
  styleUrls: ['./manage-store-info.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageStoreInfoComponent implements OnInit {

  newStore: FormGroup;
  storeId?: string;
  pageName: string = 'ADD_NEW_STORE';

  constructor(
    private myStoresService: MyStoresService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private modalController: ModalController

  ) {

    this.activatedRoute.params.subscribe(params => {
      this.storeId = params.storeId;
      // this.isFetching = true;
      if (this.storeId) {
        this.pageName = 'EDIT_STORE'
        this.myStoresService.getMyStore(this.storeId).subscribe(res => {
          this.createStoreStructure(res);
        });
      } else {
        this.createStoreStructure();
      }
    });
  }

  ngOnInit(): void {
  }

  createStoreStructure(data?: any) {
    this.newStore = new FormGroup({
      name:
        new FormControl(data?.name || '',
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(64),
            Validators.pattern(/(^[A-Z a-z \d\s-_']{4,64}$)/),
            Validators.required
          ])
        ),
      openTime:
        new FormControl(data?.openTime ? new Date(`11/11/2020 ${data?.openTime}`).toString() : '',
          Validators.compose([
            Validators.required
          ])
        ),
      closeTime:
        new FormControl(data?.closeTime ? new Date(`11/11/2020 ${data?.closeTime}`).toString() : '',
          Validators.compose([
            Validators.required
          ])
        ),
      lat:
        new FormControl(data?.location?.coordinates[0],
          Validators.compose([
            Validators.pattern(/(^(\d+).?(\d+)$)/),
            Validators.required
          ])
        ),
      long:
        new FormControl(data?.location?.coordinates[1],
          Validators.compose([
            Validators.pattern(/(^(\d+).?(\d+)$)/),
            Validators.required
          ])
        ),
      address:
        new FormControl(data?.address || '',
          Validators.compose([
            Validators.pattern(/(^[A-Z a-z ' -]{5,8}$)/),
            // Validators.required
          ])
        ),
      tags:
        new FormControl(data?.tags || '',
          Validators.compose([
            Validators.pattern(/(^[A-Z a-z\s\d-,']{2,256}$)/),
            Validators.required
          ])
        ),
      description:
        new FormControl(data?.description || '',
          Validators.compose([
            Validators.pattern(/(^[A-Z a-z \d\s-_.']{8,512}$)/),
            Validators.required
          ])
        ),
      image: new FormControl(data?.image || ''),
    });
  }
  getImageAsBase64(value) {
    this.newStore.patchValue({ image: value });
  }

  manipulateDataBeforeSending(data) {
    if (data.openTime.toString().includes('T')) {
      data.openTime = convertFrom24To12Hour(data.openTime.toString().split('T')[1].split('.')[0]);
    }
    if (data.closeTime.toString().includes('T')) {
      data.closeTime = convertFrom24To12Hour(data.closeTime.toString().split('T')[1].split('.')[0]);
    }
    return data;
  }

  manageStore() {
    if (this.storeId) {
      this.editStore();
    } else {
      this.addNewStore();
    }
  }

  addNewStore() {
    if (this.newStore.valid) {
      const data = this.manipulateDataBeforeSending(JSON.parse(JSON.stringify(this.newStore.value)))
      this.myStoresService.addNewStore(data).subscribe((res) => {
        this.toastService.presentToastWithOptions('success', 'store added successfully', 'success');

        console.log(res);
      })
    }
  }

  editStore() {
    if (this.newStore.valid) {
      const data = this.manipulateDataBeforeSending(JSON.parse(JSON.stringify(this.newStore.value)))
      this.myStoresService.editStore(this.storeId, data).subscribe((res) => {
        this.toastService.presentToastWithOptions('success', 'store updated successfully', 'success');
        console.log(res);
      })
    }
  }

  async applyLocationFromMap() {
    const modal = await this.modalController.create({
      component: MapComponent,
      showBackdrop: true,
      swipeToClose: true,
    });
    modal.onDidDismiss()
      .then((data) => {
        const location = data['data']; // Here's your selected user!
        this.newStore.get('lat').patchValue(location.lat);
        this.newStore.get('long').patchValue(location.long);
      });
    return await modal.present();
  }

}

