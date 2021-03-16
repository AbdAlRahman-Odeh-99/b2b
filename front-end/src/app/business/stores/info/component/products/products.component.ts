import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StoresService } from '../../../service/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../model/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {


  products: any[];
  storeId: string;
  categories: Category;

  constructor(
    private storesService: StoresService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.storeId = params.id;
      this.storesService.getCategoriesByStoreId('store', this.storeId).subscribe(res => {
        this.categories = res.categories;
      });
      this.storesService.getProductsByStoreId('store', this.storeId).subscribe(res => {
        this.products = res;
      });
    });
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
      categoryId= null;
    }
    this.storesService.getProductsByCategoryIdAndStoreId('store', this.storeId, categoryId).subscribe(res => {
      this.products = res;
      console.log(res)
    });
  }


}
