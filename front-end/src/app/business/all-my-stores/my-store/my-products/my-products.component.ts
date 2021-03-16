import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyStoresService } from '../../services/my-stores.service';
import { ToastService } from '@app/shared/toaster/toast.service';
import { BasedUrlsConstants } from '@app/core/constants/routes';
import { Subscription } from 'rxjs';
import { Product } from '@app/core/model/product';
import { Category } from '@app/core/model/category';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  categories: Category[];
  storeId: string = null;
  categoryId: string = null;
  isLoading: boolean = true;
  listenOnErrorLoading: Subscription;
  subscription: Subscription;
  filters = [
    { label: 'By Descending Name', value: 'nameSort=1' },
    { label: 'By ascending Name', value: 'nameSort=-1' },
    { label: 'By Descending Price', value: 'priceSort=-1&nameSort=0' },
    { label: 'By ascending Price', value: 'priceSort=1&nameSort=0' },
  ];
  customPopoverOptions: any = {
    header: 'Select Category',
  };
  filterSelected: any = 'null';
  constructor(
    private myStoresService: MyStoresService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
  ) {
    this.myStoresService.resetBothDataSkipAndLimit();
    this.getStoreId();
    this.categories = [];
    this.products = [];
    this.listenOnErrorLoading = this.myStoresService.listenOnErrorLoading().subscribe(res => {
      this.categories = [];
      this.isLoading = false;
      this.products = [];
    })
  }

  getStoreId() {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.storeId = params.id;
      this.myStoresService.getCategories(this.storeId).subscribe(res => {
        //this.categories = res.categories;
        this.setCategories(res.categories);
      });
      this.getProducts();
    });
  }

  getProducts() {
    this.myStoresService.getProducts(this.storeId, this.categoryId, this.filterSelected).subscribe((res) => {
      this.myStoresService.setSkip(this.myStoresService.skip + 5);
      this.isLoading = false;
      this.setProducts(res.products);
    });
  }

  setCategories(categories: Category[]){
    this.categories = categories;
  }

  setProducts(products: Product[]){
    this.products.push(...products.map((product) => {
      return { ...product, isOwne: product.storeId === this.storeId, editPath: product.storeId === this.storeId ? `../manage-product/edit/${product._id}` : '', image: product.image.includes('.png') ? `${BasedUrlsConstants.BASED_URL_LOCALHOST}/${product.image}` : product.image };
    }));
  }


  filterApplied(value) {
    this.filterSelected = value;
    this.products = [];
    this.isLoading = true;
    this.myStoresService.resetBothDataSkipAndLimit();
    this.getProducts();
  }

  ngOnInit(): void {
  }

  updateCategory(value) {
    let { value: categoryId } = value.target;
    if (categoryId === 'all') {
      categoryId = null;
    }
    this.isLoading = true;
    this.categoryId = categoryId;
    this.products = [];
    this.myStoresService.resetBothDataSkipAndLimit();
    this.getProducts();
  }


  deleteProduct(index: number) {
    const productId = this.products[index]._id;
    const storeId = this.products[index].storeId;
    const categoryId = this.products[index].categoryId;
    this.myStoresService.deleteProduct(storeId, categoryId, productId).subscribe((res) => {
      //this.getProducts();
      this.products = this.products.filter((products, i) => index !== i);
      this.toastService.presentToastWithOptions('success', 'Product removed successfully', 'success');
    })
  }

  ngOnDestroy(): void {
    this.myStoresService.resetBothDataSkipAndLimit();
    this.listenOnErrorLoading.unsubscribe();
    this.subscription.unsubscribe();
  }
}
