import { Product } from '@app/core/model/product';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyStoresService } from '../../services/my-stores.service';
import { ToastService } from '@app/shared/toaster/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageOffersComponent implements OnInit, OnDestroy {

  disableButtonSave = true;
  offersFromGroup: FormGroup;
  products: Product[];
  storeId: any;
  customPopoverOptions: any = {
    header: 'Select Product',
  };
  listenOnErrorLoading: Subscription;

  constructor(
    private myStoresService: MyStoresService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService

  ) {
    this.offersFromGroup = new FormGroup({
      offers: new FormArray([])
    });
    this.addOffer();
    this.initFields();
    this.listenOnCreateButton();
    this.products = [];
    this.listenOnErrorLoading =  this.myStoresService.listenOnErrorLoading().subscribe(res => {
      this.products = [];
    })
  }

  ngOnInit(): void {
  }

  addOffer(offer?: any) {
    (this.offersFromGroup.get('offers') as FormArray).push(new FormGroup({
      id: new FormControl(offer?._id || ''),
      isNew: new FormControl(offer?._id ? false : true),
      productId: new FormControl(offer?.productId || '', [Validators.required]),
      price: new FormControl(offer?.newPrice || 0, [Validators.required, Validators.pattern(/(^[\d\.]+$)/)]),
      discountRate: new FormControl(offer?.discountRate || 0, [Validators.required, Validators.pattern(/(^[\d]{1,3}$)/)]),
      duration: new FormControl(offer?.duration || 0, [Validators.required, Validators.pattern(/(^[\d]{1,3}$)/)]),
      isEditing: new FormControl(false)
    }));
  }

  deleteOffer(index) {
    const isNew = (this.offersFromGroup.get('offers') as FormArray).at(index).get('isNew').value;
    if (!isNew) {
      const offerId = (this.offersFromGroup.get('offers') as FormArray).at(index).get('id').value;
      this.myStoresService.deleteOffer(this.storeId, offerId).subscribe(res => {
        (this.offersFromGroup.get('offers') as FormArray).removeAt(index);
        this.offersFromGroup = new FormGroup({
          offers: new FormArray([])
        });
        this.toastService.presentToastWithOptions('success', 'Offers removed successfully', 'success');
      })
    } else {
      this.toastService.presentToastWithOptions('success', 'Offers removed successfully', 'success');
      (this.offersFromGroup.get('offers') as FormArray).removeAt(index);
    }
  }

  initFields() {
    this.activatedRoute.params.subscribe(params => {
      this.storeId = params.id;
      this.myStoresService.getProductsForOffers(this.storeId, null, 'nameSort=1').subscribe((res) => {
        //this.products = res.products.map((product) => ({ name: product.name, value: product._id }));
        this.setProducts(res.products);
      });
      this.getOffers();
    });
  }

  setProducts(products: Product[]){
    this.products = products.map((product) => ({ name: product.name, _id: product._id }));
  }

  getOffers() {
    this.offersFromGroup = new FormGroup({
      offers: new FormArray([])
    });
    this.myStoresService.getOffers(this.storeId).subscribe((res) => {
      res.offers.forEach((offer) => this.addOffer({ productId: offer._id, ...offer.offer }));
    });
  }

  editOffer(index: number) {
    // this.myStoresService.getOff
  }

  listenOnCreateButton() {
    this.offersFromGroup.valueChanges.subscribe(() => {
      if (this.offersFromGroup.valid) {
        this.disableButtonSave = false;
      } else {
        this.disableButtonSave = true;
      }
    });
  }

  createOffer() {
    const data = this.offersFromGroup.value.offers.filter((offer) => offer.isNew);
    this.myStoresService.createOffers(this.storeId, { productOffers: data }).subscribe(res => {
      this.offersFromGroup = new FormGroup({
        offers: new FormArray([])
      });
      this.getOffers();
      this.toastService.presentToastWithOptions('success', 'Offers created successfully', 'success');
    });
  }

  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
