import { Product } from '@app/core/model/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from './service/products.service';
// import { InfiniteScroll } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // directives: [InfiniteScroll]
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  isLoading: boolean = true;
  filterSelected: string;
  categoryId: string;
  filters = [
    { label: 'By Descending Name', value: 'nameSort=1' },
    { label: 'By ascending Name', value: 'nameSort=-1' },
    { label: 'By Descending Price', value: 'priceSort=-1&nameSort=0' },
    { label: 'By ascending Price', value: 'priceSort=1&nameSort=0' },
  ];
  listenOnErrorLoading: Subscription;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = [];
    this.getProducts();
    this.listenOnErrorLoading = this.productsService.listenOnErrorLoading().subscribe(res => {
      this.products = [];
      this.isLoading = false;
    })
  }
  
  getProducts() {
    this.productsService.getProducts(this.filterSelected).subscribe((res) => {
      this.isLoading = false;
      this.productsService.setBothDataSkipAndLimit(this.productsService.getLimit(), this.productsService.getSkip() + 5);
      this.pushToArrayProducts(res.products);
    });
  }

  pushToArrayProducts(products : Product[]){
    this.products.push(...products);
  }

  ngOnDestroy(): void {
    this.productsService.resetBothDataSkipAndLimit();
    this.listenOnErrorLoading.unsubscribe();
  }

  filterApplied(value) {
    this.filterSelected = value;
    this.products = [];
    this.isLoading = true;
    this.productsService.resetBothDataSkipAndLimit();
    this.getProducts();
  }

}
