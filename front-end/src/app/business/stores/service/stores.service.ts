import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessService } from '@app/business/services/business.service';
import { AuthService } from '@app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(
    private authService: AuthService,
    private businessService: BusinessService
  ) { }

  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }

  public getStoreById(path: string, id: string, options?: any): Observable<any> {
    path = path.concat(`/${id}`);
    return this.businessService.get(path, options);
  }

  public getStores(path: string, options?: any): Observable<any> {
    return this.businessService.get(path, options = options);
  }
  public getCategoriesByStoreId(path: string, id: string, options?: any): Observable<any> {
    path = path.concat(`/${id}/categories`);
    return this.businessService.get(path, options = options);
  }
  public getProductsByStoreId(path: string, id: string, options?: any): Observable<any> {
    path = path.concat(`/${id}/products`);
    return this.businessService.get(path, options = options);
  }
  public getOffersByStoreId(path: string, id: string, options?: any): Observable<any> {
    path = path.concat(`/${id}/offers`);
    return this.businessService.get(path, options = options);
  }

  getProductsByCategoryIdAndStoreId(path: string, storeId: string, categoryId?: string, options?: any): Observable<any> {
    path = path.concat(`/${storeId}`).concat(categoryId ? `/category/${categoryId}/products` : '/products');
    return this.businessService.get(path, options = options);
  }

  writeComplaint(storeId: string, data: any): Observable<any> {
    const path = `stores/${storeId}/create-complaint`;
    return this.businessService.post(path, { headers: { authorization: this.authService.token } }, data);
  }

  startChat(garageOwnerId: string, storeName: string) {
    const path = `user/contact`;
    return this.businessService.post(path, { headers: { authorization: this.authService.token } }, { garageOwnerId, storeName });
  }
  inContact(garageOwnerId) {
    const path = `user/chat/hasContactId/${garageOwnerId}`;
    return this.businessService.get(path, {
      headers: {
        Authorization: this.authService.token
      }
    });
  }
}
