import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BusinessService } from '@app/business/services/business.service';
import { AuthService } from '@app/core/services/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class CarsService {

  constructor(
    private businessService: BusinessService,
    private authService: AuthService
  ) {}

  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }

  getMyCars(): Observable<any> {
    return this.businessService.get(`user/manage-car-owner/cars`, {
      headers: { authorization: this.authService.token },
    });
  }

  addNewCar(data: any): Observable<any> {
    return this.businessService.post(
      'user/manage-car-owner/add-car',
      {
        headers: { authorization: this.authService.token },
      },
      data
    );
  }

  deleteCar(carId: string): Observable<any> {
    return this.businessService.delete(
      `user/manage-car-owner/delete-car/${carId}`,
      {
        headers: { authorization: this.authService.token },
      }
    );
  }

  editCar(carId: string, data: any): Observable<any> {
    return this.businessService.put(
      `user/manage-car-owner/update-car/${carId}`,
      {
        headers: { authorization: this.authService.token },
      },
      data
    );
  }
}
