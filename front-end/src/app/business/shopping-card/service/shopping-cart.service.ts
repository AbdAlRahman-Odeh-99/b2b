import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { BusinessService } from '@app/business/services/business.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private authService: AuthService,
    private businessService: BusinessService,
  ) { }


  getShoppingCart(): Observable<any> {
    return this.businessService.get('shopping-cart', { headers: { authorization: this.authService.token } });
  }
  updateCartItemInShoppingCart(cartItemId: string, data: any): Observable<any> {
    return this.businessService.put(`shopping-cart/update-cart-item/${cartItemId}`, { headers: { authorization: this.authService.token } }, data);
  }

  removeCartItemInShoppingCart(cartItemId: string): Observable<any> {
    return this.businessService.delete(`shopping-cart/remove-cart-item/${cartItemId}`, { headers: { authorization: this.authService.token } });
  }
  checkout(data): Observable<any> {
    return this.businessService.post('shopping-cart/checkout', { headers: { authorization: this.authService.token } }, data);
  }

  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }
}
