import { Component, OnInit, OnDestroy } from '@angular/core';
import { SosService } from './service/sos.service';
import { ModalController } from '@ionic/angular';
import { ViewProductComponent } from '@app/shared/view-product/view-product.component';
import { MapComponent } from '@app/shared/map/map.component';
import { Subscription } from 'rxjs';
import { AppRoutingConstants, BasedUrlsConstants, BusinessRoutingConstants } from '@app/core/constants/routes';
import { Store } from '@app/core/model/store';

@Component({
  selector: 'app-sos',
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.css']
})
export class SosComponent implements OnInit, OnDestroy {

  lat: string;
  long: string;
  stores: Store [] = [];
  listenOnErrorLoading: Subscription;
  constructor(
    private sosService: SosService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.stores = [];
    this.listenOnErrorLoading = this.sosService.listenOnErrorLoading().subscribe(res => {
      this.stores = [];
    })
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
        this.lat = Number.parseFloat(location.lat).toFixed(3);
        this.long = Number.parseFloat(location.long).toFixed(3);
      });
    return await modal.present();
  }
  
  loadStores() {
    this.sosService.getStoreNearBy(this.lat, this.long).subscribe((res) => {
      this.sosService.setSkip(this.sosService.skip + 5);
      if (!this.stores) {
        this.stores = [];
      }
      this.pushToArrayStores(res.stores);
      //this.stores.push(...res.stores);
    })
  }

  pushToArrayStores(stores : Store[]){
    this.stores.push(...stores.map((store) => {
      return { ...store, href: `/${AppRoutingConstants.BUSINESS}/${BusinessRoutingConstants.STORE}/info/${store._id}/tabs`, type: 'stores', image: store.image.includes('.png') ? `${BasedUrlsConstants.BASED_URL_LOCALHOST}/${store.image}` : store.image };
    }));
  }

  getStoresNearBy() {
    this.stores = null;
    this.loadStores();
  }
  ngOnDestroy(): void {
    this.sosService.resetBothDataSkipAndLimit();
    this.listenOnErrorLoading.unsubscribe();
  }
}
