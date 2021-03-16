import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { BasedUrlsConstants } from '@app/core/constants/routes';
import { Router } from '@angular/router';
import { AppRoutingConstants, BusinessRoutingConstants } from '@app/core/constants/routes';
import { TokenHandlerService } from '@app/core/services/token-handler/token-handler.service';
import { catchError } from 'rxjs/operators';
// import jwt from 'jsonwebtoken';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subject: Subject<{}>;
  basedUrl = BasedUrlsConstants.BASED_URL_LOCALHOST;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  token: string;
  user: any;
   constructor(
    private router: Router,
    private tokenHandlerService: TokenHandlerService,
    private http: HttpClient
  ) {
    this.subject = new Subject<any>();
    this.getData();
  }

  getData() {
    if (localStorage.getItem('access_token')) {
      this.token = localStorage.getItem('access_token');
      this.user = this.tokenHandlerService.getPayload(this.token);
    }
  }

  userInfo(): any {
    return this.user;
  }

  signUpForGarageOwner(data): Observable<any> {
    return this.http.post(this.basedUrl + 'user/garage-owner/create', data);
  }
  signUpForCarOwner(data): Observable<any> {
    return this.http.post(this.basedUrl + 'user/car-owner/create', data);
  }
  login(data) {
    this.http.post(this.basedUrl + 'user/login', data, { headers: this.headers }).pipe(catchError(this.error)).subscribe(async (res: any) => {
      if (res.auth) {
        localStorage.setItem('access_token', res.token);
        this.token = res.token;
        this.user = this.tokenHandlerService.getPayload(this.token);
        this.router.navigateByUrl(`/${AppRoutingConstants.BUSINESS}`);
      } else {

      }
    });

  }

  public get loggedIn(): boolean {
    return this.tokenHandlerService.isTokenValid(this.token);
  }
  private error(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try aga<  in later.');
  }
}
