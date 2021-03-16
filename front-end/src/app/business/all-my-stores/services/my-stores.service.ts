import { Injectable } from '@angular/core';
import { BusinessService } from '@app/business/services/business.service';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class MyStoresService {

  limit = 5;
  skip = 0;

  constructor(private businessService: BusinessService, private authService: AuthService) { }

  public setLimit(limit: number): boolean {
    this.limit = limit;
    return true;
  }

  public setSkip(skip: number): boolean {
    this.skip = skip;
    return true;
  }

  public setBothDataSkipAndLimit(limit: number, skip: number): boolean {
    this.limit = limit;
    this.skip = skip;
    return true;
  }

  public resetBothDataSkipAndLimit(): boolean {
    this.limit = 5;
    this.skip = 0;
    return true;
  }

  public getLimit(): number {
    return this.limit;
  }

  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }

  public getSkip(): number {
    return this.skip;
  }

  public getMyStores(): Observable<any> {
    const path = `user/manage-garage-owner/stores?limit=${this.limit}&skip=${this.skip}`;
    return this.businessService.get(path, { headers: { authorization: this.authService.token } });
  }

  public getMyStoresId(): Observable<any> {
    const path = 'user/manage-garage-owner/stores/storesId';
    return this.businessService.get(path, { headers: { authorization: this.authService.token } });
  }

  public getMyStore(storeId: string): Observable<any> {
    const path = `stores/${storeId}`;
    return this.businessService.get(path, { headers: { authorization: this.authService.token } });
  }

  public createCategory(storeId: string, data: any): Observable<any> {
    const path = `stores/${storeId}/create-category`;
    return this.businessService.post(path, { headers: { authorization: this.authService.token } }, data);
  }

  public updateCategory(storeId: string, categoyId: string, data: any): Observable<any> {
    const path = `stores/${storeId}/update-category/${categoyId}`;
    return this.businessService.put(path, { headers: { authorization: this.authService.token } }, data);
  }

  public removeCategory(storeId: string, categoyId: string): Observable<any> {
    const path = `stores/${storeId}/delete-category/${categoyId}`;
    return this.businessService.delete(path, { headers: { authorization: this.authService.token } });
  }

  public insertProduct(storeId: string, categoryId: string, data: any): Observable<any> {
    const path = `stores/${storeId}/category/${categoryId}/create-product`;
    return this.businessService.post(path, { headers: { authorization: this.authService.token } }, data);
  }

  public updateProduct(storeId: string, categoryId: string, productId, data: any): Observable<any> {
    const path = `stores/${storeId}/category/${categoryId}/update-product/${productId}`;
    return this.businessService.put(path, { headers: { authorization: this.authService.token } }, data);
  }

  public createOffers(storeId: string, data: any): Observable<any> {
    const path = `stores/${storeId}/offers/add-offer`;
    return this.businessService.post(path, { headers: { authorization: this.authService.token } }, data);
  }

  public getOffers(storeId: string): Observable<any> {
    const path = `stores/${storeId}/offers`;
    return this.businessService.get(path);
  }

  public addNewStore(data: any): Observable<any> {
    const path = 'user/manage-garage-owner/add-store';
    return this.businessService.post(path, { headers: { authorization: this.authService.token } }, data);
  }

  public editStore(storeId: string, data: any): Observable<any> {
    const path = `user/manage-garage-owner/update-store/${storeId}`;
    return this.businessService.put(path, { headers: { authorization: this.authService.token } }, data);
  }

  public getCategories(storeId: string): Observable<any> {
    return this.businessService.get(`stores/${storeId}/categories`);
  }

  public getCategory(storeId: string, categoryId: string): Observable<any> {
    return this.businessService.get(`stores/${storeId}/categories/${categoryId}`);
  }

  getProductsForOffers(storeId: string, categoryId?: string, filter?: string): Observable<any> {
    const path = `stores/${storeId}${categoryId ? `/category/${categoryId}` : ''}/products`;
    return this.businessService.get(path);
  }
  getProducts(storeId: string, categoryId?: string, filter?: string): Observable<any> {
    const path = `stores/${storeId}${categoryId ? `/category/${categoryId}` : ''}/products?limit=${this.limit}&skip=${this.skip}${filter ? '&'.concat(filter) : ''}`;
    return this.businessService.get(path);
  }

  getProduct(storeId: string, productId: string): Observable<any> {
    const path = `stores/${storeId}/products/${productId}`;
    return this.businessService.get(path);
  }

  getOrders(storeId: string, status: string): Observable<any> {
    console.log(storeId, status)
    const path = `store/${storeId}/orders?status=${status}`;
    return this.businessService.get(path, { headers: { authorization: this.authService.token } });
  }

  updateOrderStatus(storeId: string, orderId: string, status: string): Observable<any> {
    console.log(orderId, storeId)
    const path = `store/${storeId}/order/${orderId}`;
    console.log(path)
    return this.businessService.put(path, { headers: { authorization: this.authService.token } }, { status });
  }

  deleteStore(storeId: string): Observable<any> {
    return this.businessService.delete(
      `user/manage-garage-owner/delete-store/${storeId}`
      , {
        headers: { authorization: this.authService.token }
      });
  }

  deleteOffer(storeId: string, offerId: string): Observable<any> {
    return this.businessService.delete(
      `stores/${storeId}/offers/delete-offer/${offerId}`
      , {
        headers: { authorization: this.authService.token }
      });
  }

  deleteProduct(storeId: string, categoryId: string, productId: string): Observable<any> {
    return this.businessService.delete(
      `stores/${storeId}/category/${categoryId}/delete-product/${productId}`
      , {
        headers: { authorization: this.authService.token }
      });
  }
}
