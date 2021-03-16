import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchByImageService } from './service/search-by-image.service';
import { SearchService } from '@app/business/search-result/service/search.service';
import { Subscription } from 'rxjs';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'search-by-image',
  templateUrl: './search-by-image.component.html',
  styleUrls: ['./search-by-image.component.css']
})
export class SearchByImageComponent implements OnInit, OnDestroy {
  image = 'assets/defaultImage.png';
  disableSaerch = true;
  isLoading = false;
  isShowResult = false;
  imageNameResult: string;
  resultOfSearch: any [];
  listenOnErrorLoading: Subscription;
  constructor(
    private searchByImageService: SearchByImageService,
    private translate: TranslateService,
    private searchService: SearchService
  ) {
    this.resultOfSearch = [];
    this.listenOnErrorLoading = this.searchService.listenOnErrorLoading().subscribe(res => {
      this.resultOfSearch = [];
    })
  }

  ngOnInit(): void {
  }
  getImageAsBase64(value) {
    this.disableSaerch = false;
    this.image = value;
  }
  search() {
    this.disableSaerch = true;
    this.isLoading = true;
    this.searchByImageService.searchByImage(this.image).subscribe(res => {
      this.isLoading = false;
      this.isShowResult = true;
      this.imageNameResult = res.name;
      this.searchService.search(this.imageNameResult).subscribe(res => {
        this.resultOfSearch = res.productsSearchResult;
      })
    });
  }
  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
