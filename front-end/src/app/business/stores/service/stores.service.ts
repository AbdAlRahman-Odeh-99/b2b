import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessService } from '@app/business/services/business.service';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private businessService: BusinessService) { }

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
}
