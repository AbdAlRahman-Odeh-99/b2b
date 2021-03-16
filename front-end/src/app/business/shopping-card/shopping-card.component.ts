import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ShoppingCartService } from './service/shopping-cart.service';
import { AlertController } from '@ionic/angular';
import { ToastService } from '@app/shared/toaster/toast.service';
import { Subscription } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss'],
})
export class ShoppingCardComponent implements OnInit, OnDestroy {
  // cart = stores;
  total: number;
  cartForm: FormGroup;
  items: FormArray;
  isFetching = true;
  isEmpty: boolean;
  listenOnErrorLoading: Subscription;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private alertController: AlertController,
    private toastService: ToastService,
    private translate: TranslateService
  ) {
    this.getShoppingCartItems();
    this.items = new FormArray([]);
    this.listenOnErrorLoading = this.shoppingCartService.listenOnErrorLoading().subscribe(res => {
      this.items = new FormArray([]);
    })
  }

  getShoppingCartItems() {
    this.isFetching = true;
    this.shoppingCartService.getShoppingCart().subscribe((res) => {
      this.items = new FormArray([]);
      res.cartItems.forEach((item) => {
        if (item.product) {
          this.items.push(
            new FormGroup({
              cartItemId: new FormControl(item._id),
              id: new FormControl(item.product._id),
              name: new FormControl(item.product.name),
              price: new FormControl(item.product.price),
              description: new FormControl(item.product.description),
              quantity: new FormControl(item.quantity),
              image: new FormControl(item.product.image),
              tags: new FormControl(item.product.tags),
            })
          );
        }
      });
      this.cartForm = new FormGroup({
        items: this.items,
      });
      this.total = this.calculateTotal();
      this.isFetching = false;
      if ((this.items as FormArray).length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    });
  }

  ngOnInit(): void { }

  calculateTotal() {
    let total = 0;
    for (let i = 0; i < (this.cartForm.get('items') as FormArray).length; i++) {
      total +=
        (this.cartForm.get('items') as FormArray).at(i).get('quantity').value *
        (this.cartForm.get('items') as FormArray).at(i).get('price').value;
    }
    return total;
  }

  updateCartItem(cartItemId: string, quantity: number) {
    this.shoppingCartService
      .updateCartItemInShoppingCart(cartItemId, { quantity })
      .subscribe((res) => {
        this.toastService.presentToastWithOptions('success', 'Shopping Cart updated successfully', 'success');
      });
  }

  add(i: any) {
    const quantity = (this.cartForm.get('items') as FormArray)
      .at(i)
      .get('quantity').value;
    const cartItemId = (this.cartForm.get('items') as FormArray)
      .at(i)
      .get('cartItemId').value;
    (this.cartForm.get('items') as FormArray)
      .at(i)
      .get('quantity')
      .setValue(quantity + 1);
    this.total = this.calculateTotal();
    this.updateCartItem(cartItemId, quantity + 1);
  }

  minus(i: any) {
    const quantity = (this.cartForm.get('items') as FormArray)
      .at(i)
      .get('quantity').value;
    const cartItemId = (this.cartForm.get('items') as FormArray)
      .at(i)
      .get('cartItemId').value;
    (this.cartForm.get('items') as FormArray)
      .at(i)
      .get('quantity')
      .setValue(quantity - 1);
    this.total = this.calculateTotal();
    this.updateCartItem(cartItemId, quantity - 1);
  }

  remove(i: any) {
    const cartItemId = (this.cartForm.get('items') as FormArray)
      .at(i)
      .get('cartItemId').value;
    this.shoppingCartService
      .removeCartItemInShoppingCart(cartItemId)
      .subscribe((res) => {
        (this.cartForm.get('items') as FormArray).removeAt(i);
        this.total = this.calculateTotal();
        if ((this.cartForm.get('items') as FormArray).length === 0) {
          this.isEmpty = true;
        }
        this.toastService.presentToastWithOptions('success', 'Item removed successfully', 'success');
      });
  }

  get itemsArray(): FormArray {
    return this.cartForm.get('items') as FormArray;
  }

  async presentAlertConfirm() {
    
    this.translate.get('CHECKOUT_INFO').subscribe(res1 => {
      this.translate.get('DELIVERY_ADDRESS').subscribe(res2 => {
        this.translate.get('PHONE_NUMBER').subscribe(res3 => {
          this.translate.get('CANCEL').subscribe(res4 => {
            this.translate.get('OKAY').subscribe(async res5 => {
              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: res1,
                inputs: [
                  {
                    name: 'deliveryAddress',
                    type: 'text',
                    placeholder: res2,
                  },
                  {
                    name: 'phoneNumber',
                    type: 'text',
                    placeholder: res3,
                  },
                ],
                buttons: [
                  {
                    text: res4,
                    role: 'cancel',
                    cssClass: 'secondary',
                    // handler: (blah) => {
                    //   console.log(blah)
                    // }
                  },
                  {
                    text: res5,
                    handler: (data) => {
                      console.log(data);
                      this.shoppingCartService
                        .checkout(data)
                        .subscribe(res => {
                          this.getShoppingCartItems();
                          this.toastService.presentToastWithOptions('success', 'Checkout successfully', 'success');
                        });
                    },
                  },
                ],
              });
              await alert.present();
            });
          });
        });
      });
    });
    

    
  }
  onSubmit() {
    this.presentAlertConfirm();
  }
  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
