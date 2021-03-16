import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { StoresService } from '../../../service/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// import { Category } from '../../../model/category';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffersComponent implements OnInit, OnDestroy {

  offers: any[];
  isFetching = false;
  listenOnErrorLoading: Subscription;
  constructor(
    private storesService: StoresService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.offers = [];
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.isFetching = true;
      this.storesService.getOffersByStoreId('stores', id).subscribe(res => {
        this.isFetching = false;
        this.offers = res.offers;
      });
    });
    this.listenOnErrorLoading = this.storesService.listenOnErrorLoading().subscribe(res => {
      this.offers = [];
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
