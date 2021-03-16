import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewProductComponent } from '@app/shared/view-product/view-product.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Input() type?: string;
  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
  }

  isStore(): string {
    return this.type && this.type === 'stores' ? 'storeOpenClose' : 'productInOutStock';
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ViewProductComponent,
      // cssClass: 'my-custom-class'
      swipeToClose: true,
    });
    return await modal.present();
  }
}
