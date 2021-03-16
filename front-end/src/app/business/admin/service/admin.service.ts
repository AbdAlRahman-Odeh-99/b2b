import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusinessService } from '@app/business/services/business.service';
import {
  AuthService
} from '@app/core/services/auth/auth.service';


@Injectable()
export class AdminService {

  constructor(
    private auth: AuthService,
    private busunessService: BusinessService
  ) { }

  getUsers(): Observable<any> {
    return this.busunessService.get('admin/view-users',  {
      headers: { authorization: this.auth.token },
    });
  }

  listenOnErrorLoading(): Observable<any> {
    return this.busunessService.errorLoading.asObservable();
  }

  getWaitingUsers(): Observable<any> {
    return this.busunessService.get('admin/waiting-users',  {
      headers: { authorization: this.auth.token },
    });
  }

  acceptUser(userId: string): Observable<any> {
    return this.busunessService.put(`admin/waiting-users/accept/${userId}`,  {
      headers: { authorization: this.auth.token },
    });
  }
  rejectUser(userId: string): Observable<any> {
    return this.busunessService.delete(`admin/waiting-users/reject/${userId}`,  {
      headers: { authorization: this.auth.token },
    });
  }
  deleteUser(userId: string): Observable<any> {
    return this.busunessService.delete(`admin/view-users/delete/${userId}`,  {
      headers: { authorization: this.auth.token },
    });
  }

}
