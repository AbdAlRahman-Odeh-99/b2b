import { AuthService } from '@app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/services/product/product.service';
import { ToastService } from '@app/shared/toaster/toast.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProductComponent implements OnInit {
  id;
  product: any;
  constructor(
    private productsService: ProductService, 
    private toastService: ToastService,
    private modalController: ModalController,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.productsService.getProduct(this.id).subscribe((res) => {
      this.product = res;
    });
  }

  addToShoppingCart() {
    this.productsService
      .addToShoppingCart(this.product.storeId, this.product._id, {
        quantity: 1,
      })
      .subscribe((res) => {
        this.toastService.presentToastWithOptions('success', 'Product added to shopping cart successfully', 'success');
      });
  }

  closeCard(){
    this.modalController.dismiss();
  }

}
