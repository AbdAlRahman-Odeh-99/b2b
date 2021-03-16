import { TranslateService } from '@ngx-translate/core';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BasedUrlsConstants } from '@app/core/constants/routes';
import { catchError } from 'rxjs/operators';
import { ToastService } from '@app/shared/toaster/toast.service';
@Injectable({
  providedIn: 'any',
})
export class BusinessService {

  basedUrl = BasedUrlsConstants.BASED_URL_LOCALHOST + '/';
  errorLoading: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private toastService: ToastService, private translate: TranslateService) { }

  public get(path: string, options?: any): Observable<any> {
    const basedUrl = this.basedUrl.concat(path);

    return this.http.get(basedUrl, options).pipe(catchError((error) => this.error(error)));
  }

  public post(path: string, options?: any, body?: any): Observable<any> {
    const basedUrl = this.basedUrl.concat(path);
    return this.http
      .post(basedUrl, body, { ...options })
      .pipe(catchError((error) => this.error(error)));
  }

  public put(path: string, options?: any, body?: any): Observable<any> {
    const basedUrl = this.basedUrl.concat(path);
    console.log(basedUrl)
    return this.http.put(basedUrl, body, options).pipe(catchError((error) => this.error(error)));
  }

  public patch(path: string, options?: any, body?: any): Observable<any> {
    const basedUrl = this.basedUrl.concat(path);
    return this.http.patch(basedUrl, body, options).pipe(catchError((error) => this.error(error)));
  }
  public delete(path: string, options?: any): Observable<any> {
    const basedUrl = this.basedUrl.concat(path);
    return this.http.delete(basedUrl, options).pipe(catchError((error) => this.error(error)));
  }

  private error(error: HttpErrorResponse) {
    this.errorLoading.emit(true)
    if(error?.error?.error){
      this.translate.get(error.error.error).subscribe(res => {
        this.translate.get('ERROR').subscribe(res1 => {
          this.toastService.presentToastWithOptions(res1, res, 'danger');
        });
      });
    }
    else{
      this.translate.get('ERROR_CONNECTING_WITH_BACKEND').subscribe(res => {
        this.translate.get('ERROR').subscribe(res1 => {
          this.toastService.presentToastWithOptions(res1, res, 'danger');
        });
      });
    }
    
    
    return throwError('Something bad happened; please try aga<  in later.');
  }
}
