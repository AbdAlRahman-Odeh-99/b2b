import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusinessService } from '@app/business/services/business.service';
import { SharedConstants } from '@app/core/constants/constants';

@Injectable()
export class SearchService {

  constructor(
    private businessService: BusinessService,
  ) { }
  
  search(searchFor: string, filters?: string): Observable<any> {
    const path = `${SharedConstants.SEARCH}`.concat('?search=').concat(searchFor).concat('&filter=products').concat(filters || '');
    return this.businessService.get(path);
  }

  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }
}
