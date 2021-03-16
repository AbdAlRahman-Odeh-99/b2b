import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MyStoresService } from '@app/business/all-my-stores/services/my-stores.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ToastService } from '@app/shared/toaster/toast.service';
import { Subscription } from 'rxjs';
import { Category } from '@app/core/model/category';


@Component({
  selector: 'app-insert-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageProductComponent implements OnInit, OnDestroy {
  images = [];
  isLoading = false;
  loadType = '';
  categories: Category[];
  productFromGroup: FormGroup;
  disableButtonSave = true;
  storeId: string;
  productId?: string;
  categoryId?: string;
  selectedCategoryId: string;
  pageName: string = "Insert New Product";
  typies: string [] = [
    'wheel',
    'mirror',
  ];
  listenOnErrorLoading: Subscription;
  constructor(
    private camera: Camera,
    private myStoresService: MyStoresService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
  ) {
    this.categories = [];
    this.listenOnErrorLoading = this.myStoresService.listenOnErrorLoading().subscribe(res => {
      this.categories = [];
    })
    this.activatedRoute.params.subscribe(params => {
      this.storeId = params.id;
      this.productId = params.productId;
      // this.isFetching = true;
      if (this.productId) {
        this.pageName = 'Update product'
        this.myStoresService.getProduct(this.storeId, this.productId).subscribe(res => {
          this.categoryId = res.categoryId;
          this.createProductStructure(res);
          this.listenOnValidateButtonSave();
          this.getStoreIdAndCategories();
        });
      } else {
        this.createProductStructure();
        this.listenOnValidateButtonSave();
        this.getStoreIdAndCategories();
      }
    });
  }

  createProductStructure(data?: any) {
    this.productFromGroup = new FormGroup({
      name: new FormControl(data?.name || '', [
        Validators.required,
        //Validators.pattern(/(^[A-Z a-z \s\d-']{4,64}$)/),
        this.customPatternValid({ pattern: /(^[\p{L}\s\d'-]{4,64}$)/ugi , msg: 'invalid product name'})
      ]), //
      description: new FormControl(data?.description || '', [
        Validators.required,
        //Validators.pattern(/(^[A-Z a-z \s\d-'\.]{8,254}$)/),
        this.customPatternValid({ pattern: /(^[\p{L}\s\d'\.-]{8,254}$)/ugi , msg: 'invalid description'})
      ]),
      price: new FormControl(data?.price || 0, [
        Validators.required,
        //Validators.pattern(/(^[\d\.]+$)/),
        this.customPatternValid({ pattern: /(^[\d\.])/ , msg: 'invalid price'})
      ]),
      amount: new FormControl(data?.amount || 0, [
        Validators.required,
        //Validators.pattern(/(^[\d\.]+$)/),
        this.customPatternValid({ pattern: /(^[\d\.]+$)/ , msg: 'invalid amount'})
      ]),
      tags: new FormControl((data?.tags || []).join(', ') || '', [
        Validators.required,
        //Validators.pattern(/(^[A-Z a-z\s\d-,']{2,256}$)/),
        this.customPatternValid({ pattern: /(^[\p{L}\s\d',-]{2,256}$)/ugi , msg: 'invalid tags'})
      ]),
      productType: new FormControl(data?.productType || '', [Validators.required]),
      generalType: new FormControl(data?.generalType || '', [Validators.required]),
      image: new FormControl(data?.image || '', [Validators.required]),
      categoryId: new FormControl(data?.categoryId || '', [Validators.required]),
    });
  }
  getStoreIdAndCategories() {
    this.activatedRoute.params.subscribe((params) => {
      this.storeId = params.id;
      this.myStoresService.getCategories(this.storeId).subscribe((res) => {
        //this.categories = res.categories;
        this.setCategories(res.categories);
      });
    });
  }

  setCategories(categories: Category[]){
    this.categories = categories;
  }

  listenOnValidateButtonSave() {
    this.productFromGroup.valueChanges.subscribe(() => {
      if (this.productFromGroup.valid) {
        this.disableButtonSave = false;
      } else {
        this.disableButtonSave = true;
      }
    });
  }
  takePhoto() {
    this.isLoading = true;
    this.loadType = 'takePhoto';
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.images.push('data:image/jpeg;base64,' + imageData);
        this.isLoading = false;
        this.loadType = '';
      },
      (err) => {
        // Handle error
        this.isLoading = false;
        this.loadType = '';
      }
    );
  }
  ngOnInit(): void {}

  uploadImage(event) {
    this.isLoading = true;
    this.loadType = 'uploadImage';
    const reader = new FileReader();
    const i = this;
    const file = event.target.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result.toString();
      image.onload = () => {
        // if (image.width < 400 && image.width > 350 && image.height < 350 && image.height > 300) {
        this.productFromGroup.patchValue({ image: reader.result });
        // } else {
        //   // console.log('size error');
        //   this.toastService.presentToastWithOptions('error', 'size error', 'danger');
        // }
        this.isLoading = false;
        this.loadType = '';
      };
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
      this.isLoading = false;
      this.loadType = '';
    };
  }

  insertProduct() {
    const data = this.manipulateDataBeforeSending();
    this.myStoresService
      .insertProduct(this.storeId, this.selectedCategoryId, data)
      .subscribe((res) => {
        this.toastService.presentToastWithOptions('success', 'Product created successfully', 'success');
      });
  }

  updateProduct() {
    const data = this.manipulateDataBeforeSending();
    this.myStoresService
      .updateProduct(this.storeId, this.categoryId, this.productId, data)
      .subscribe((res) => {
        this.toastService.presentToastWithOptions('success', 'Product updated successfully', 'success');
      });
  }

  manageProduct() {
    if (this.productId) {
      this.updateProduct();
    } else {
      this.insertProduct();
    }
  }
  manipulateDataBeforeSending(): any {
    const data = JSON.parse(JSON.stringify(this.productFromGroup.value));
    this.selectedCategoryId = data.categoryId;
    delete data.categoryId;
    return data;
  }

  public customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null;
      }
    };
  }
  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
