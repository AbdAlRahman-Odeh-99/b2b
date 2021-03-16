import { Component, OnInit } from '@angular/core';
import { StoresService } from './service/stores.service';
import { Store } from './model/store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: Store[];

  constructor(
    private storeService: StoresService
  ) {
    this.getStores();
  }

  ngOnInit(): void {

  }

  getStores() {
    // setTimeout(() => {
      this.storeService.getStores('stores').subscribe((res) => {
        this.stores = res.map((store) => {
          return { ...store, href: `info/${store._id}` };
        });
        console.log(this.stores, res);
      });
    // }, 1000)
  }
}
