import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewProductComponent } from '@app/shared/view-product/view-product.component';
import { BusinessService } from '@app/business/services/business.service';
import { isAfter, isBefore, differenceInHours } from 'date-fns';
import { AppRoutingConstants, BusinessRoutingConstants } from '@app/core/constants/routes';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Input() type?: string = 'products';
  @Input() isOwne?: boolean;
  products = 'products';
  stores = 'stores';
  @Output('delete') delete: EventEmitter<any> = new EventEmitter();


  constructor(
    public modalController: ModalController,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  isStore(): string {
    return this.type && this.type === 'stores' ? 'storeOpenClose' : 'productInOutStock';
  }

  routeTo(value) {
    this.router.navigateByUrl(value);
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ViewProductComponent,
      componentProps: {
        id
      },
      showBackdrop: true,
      swipeToClose: true,
    });
    return await modal.present();
  }

  deleteCard() {
    this.delete.emit();
  }

  editCard() {

  }

  isOpen(data: any) {
    const openTime = new Date(`11/11/2020 ${data?.openTime}`);
    const closeTime = new Date(`11/11/2020 ${data?.closeTime}`);
    const currentTime = new Date(new Date(`11/11/2020 ${new Date().toString().split(' ')[4]}`));

    //console.log(openTime,closeTime,currentTime,data,isAfter(currentTime, openTime),isBefore(currentTime, closeTime),differenceInHours(closeTime, openTime));
    //console.log(closeTime.toDateString());

    if (differenceInHours(closeTime, openTime) < 0) {
      closeTime.setDate(closeTime.getDate() + 1);
      return isAfter(currentTime, openTime) && isBefore(currentTime, closeTime);
    }

    return isAfter(currentTime, openTime) && isBefore(currentTime, closeTime);

  }


}
