import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { StoresService } from '../../../service/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../model/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {


  products: any[];
  storeId: string;
  categories: Category;
  isFetching = false;
  listenOnErrorLoading: Subscription;
  constructor(
    private storesService: StoresService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.products = [];
    this.activatedRoute.params.subscribe(params => {
      this.storeId = params.id;
      this.storesService.getCategoriesByStoreId('stores', this.storeId).subscribe(res => {
        this.categories = res.categories;
      });
      this.isFetching = true;
      this.storesService.getProductsByStoreId('stores', this.storeId).subscribe(res => {
        this.isFetching = false;
        this.products = res.products;
      });
    });
    this.listenOnErrorLoading = this.storesService.listenOnErrorLoading().subscribe(res => {
      this.products = [];
    })
  }
  customPopoverOptions: any = {
    header: 'Select Category',
    // message: 'You can scroll down'
  };
  ngOnInit(): void {
  }

  updateCategory(value) {
    let { value: categoryId } = value.target;
    if (categoryId === 'all') {
      categoryId = null;
    }
    this.isFetching = true;
    this.storesService.getProductsByCategoryIdAndStoreId('stores', this.storeId, categoryId).subscribe(res => {
      this.isFetching = false;
      this.products = res.products;
    });
  }

  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
