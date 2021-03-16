import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusinessService } from '@app/business/services/business.service';
import { AuthService } from '@app/core/services/auth/auth.service';

@Injectable()
export class SosService {
  limit = 5;
  skip = 0;
  constructor(
    private businessService: BusinessService,
    private authService: AuthService,
  ) { }

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

  getStoreNearBy(lat: string, long: string): Observable<any> {
    const path = `view-stores/location?lat=${lat}&long=${long}`;
    return this.businessService.get(path, {
      headers: { authorization: this.authService.token },
    });
  }
  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }
}
