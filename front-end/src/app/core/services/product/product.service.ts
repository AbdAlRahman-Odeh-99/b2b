import { Injectable } from '@angular/core';
import { BusinessService } from '@app/business/services/business.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private businessService: BusinessService, private authService: AuthService) { }

  getProduct(productsId): Observable<any> {
    return this.businessService.get(`products/${productsId}`);
  }

  addToShoppingCart(storeId: string, productId: string, data: any): Observable<any> {
    return this.businessService.post(`shopping-cart/add-cart/${storeId}/${productId}`, { headers: { authorization: this.authService.token } }, data);
  }
}
