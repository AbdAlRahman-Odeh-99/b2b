import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessService } from '@app/business/services/business.service';
@Injectable()
export class ProductsService {
  limit = 5;
  skip = 0;

  constructor(private businessService: BusinessService) { }

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

  public getSkip(): number {
    return this.skip;
  }

  getProducts(filter?: string): Observable<any>{
    const path = `products?limit=${this.limit}&skip=${this.skip}&${filter}`;
    return this.businessService.get(path);
  }

  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }
}
