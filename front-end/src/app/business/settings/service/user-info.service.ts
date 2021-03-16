import { Observable } from 'rxjs';
import { BusinessService } from '../../services/business.service';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private auth:AuthService,
    private businessService: BusinessService
  ) { }

  getUserInfo(): Observable<any> {
    return this.businessService.get('user-info', {
      headers: { authorization: this.auth.token },
    });
  }

  setUserInfo(data: any): Observable<any>{
    return this.businessService.put(
      'user/manage-user-info',
      {
        headers: { authorization: this.auth.token },
      },
      data
    );
  }

  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }
}
