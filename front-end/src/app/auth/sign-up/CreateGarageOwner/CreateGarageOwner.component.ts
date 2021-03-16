import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SignUpInfoService } from '@app/core/services/sign-up/sign-up-info.service';
import { Router } from '@angular/router';
import { AuthRoutingConstants, AppRoutingConstants, SharedRoutingConstants } from '@app/core/constants/routes';
import { ModalController } from '@ionic/angular';
import { ViewProductComponent } from '@app/shared/view-product/view-product.component';
import { MapComponent } from '@app/shared/map/map.component';

@Component({
  selector: 'app-CreateGarageOwner',
  templateUrl: './CreateGarageOwner.component.html',
  styleUrls: ['./CreateGarageOwner.component.scss']
})
export class CreateGarageOwnerComponent implements OnInit {
  storeInfo: FormGroup;

  constructor(
    private signUpInfoService: SignUpInfoService,
    private router: Router,
    private translate: TranslateService,
    private modalController: ModalController

  ) {
    this.storeInfo = this.signUpInfoService.getGarageInfoData();
    if (this.signUpInfoService.getUserInfoData().invalid) {
      this.router.navigateByUrl(`${AppRoutingConstants.AUTH}/${AuthRoutingConstants.SIGN_UP}/${SharedRoutingConstants.GARAGE}/${AuthRoutingConstants.USER_INFO}`);
      return;
    }
  }

  ngOnInit() {
  }

  getImageAsBase64(value) {
    this.storeInfo.patchValue({ image: value });
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
        this.storeInfo.get('lat').patchValue(location.lat);
        this.storeInfo.get('long').patchValue(location.long);
      });
    return await modal.present();
  }
}
