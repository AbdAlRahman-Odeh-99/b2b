import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SearchService } from '@app/business/search-result/service/search.service';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingConstants, BasedUrlsConstants, BusinessRoutingConstants } from '@app/core/constants/routes';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  result: any [];
  isLoading: boolean = false;
  subscription: Subscription;
  key: string;
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.subscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      this.key = queryParams.search;
      this.search();
    });
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
   
  }

  search() {
    const stores = [];
    const products = [];
    this.isLoading = true;
    this.result = null;
    if (this.key) {
      this.searchService.search(this.key).subscribe(res => {
        stores.push(...res.storesSearchResult.map((store) => {
          return { ...store, href: `/${AppRoutingConstants.BUSINESS}/${BusinessRoutingConstants.STORE}/info/${store._id}/tabs`, type: 'stores', image: store.image.includes('.png') ? `${BasedUrlsConstants.BASED_URL_LOCALHOST}/${store.image}` : store.image };
        }));
        products.push(...res.productsSearchResult.map((product) => {
          return { ...product, type: 'products', image: product.image.includes('.png') ? `${BasedUrlsConstants.BASED_URL_LOCALHOST}/${product.image}` : product.image };
        }));
        this.result = [...stores, ...products];
        this.isLoading = false;
        if(stores.length === 0 && products.length === 0){
          this.result = [];
        }
      })
    } else {
      this.isLoading = false;
      this.result = [];
    }
  }
}
