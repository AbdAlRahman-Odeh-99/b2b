import { Order } from '@app/core/model/order';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessService } from '@app/business/services/business.service';
import { MyStoresService } from '../services/my-stores.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/shared/toaster/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  storeId: string;
  status: string;
  orders: Order[];
  storesId: any[];
  customPopoverOptions: any = {
    header: 'Select Store',
  };
  statusOrder: string = 'pending';
  statuses: any[] = [
    {
      key: 'pending',
      label: 'PENDING',
    },
    {
      key: 'delivered',
      label: 'DELIVERED',
    },
    {
      key: 'cancel',
      label: 'CANCELED',
    },
    {
      key: '',
      label: 'ALL',
    },
  ];
  listenOnErrorLoading: Subscription;
  constructor(
    private myStoresService: MyStoresService,
    private toastService: ToastService
  ) {
    this.getMyStoresId();
    this.storesId = [];
    this.orders = [];
    this.listenOnErrorLoading = this.myStoresService.listenOnErrorLoading().subscribe(res => {
      this.storesId = [];
      this.orders = [];
    })
  }

  ngOnInit(): void {
  }

  getOrders() {
    console.log(this.storeId, this.status)
    this.orders = [];
    this.myStoresService.getOrders(this.storeId, this.status).subscribe(res => {
      console.log(res);
      //this.orders = res.order;
      this.setOrders(res.order);
    });
  }

  setOrders(orders: Order[]){
    this.orders = orders;
  }

  getMyStoresId() {
    this.myStoresService.getMyStoresId().subscribe(res => {
      this.storesId = res.storesId;
      console.log(this.storesId[0]?._id)
      this.storeId = this.storesId[0]?._id;
      this.status = this.statuses[0]?.key;
      this.getOrders();
    });
  }

  selectStore(value) {
    const { value: storeId } = value.target;
    this.storeId = storeId;
    this.getOrders();
  }

  selectStatusOrder(value) {
    const { value: status } = value.target;
    this.status = status;
    this.getOrders();
  }

  updateOrderStatus(storeId, orderId, status) {
    this.myStoresService.updateOrderStatus(storeId, orderId, status).subscribe(res => {
      this.toastService.presentToastWithOptions('success', `order ${status} successfully`, 'success');
      this.getOrders();
    })
  }

  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
