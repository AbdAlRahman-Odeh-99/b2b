import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth/auth.service';
import { AppRoutingConstants, AuthRoutingConstants } from '@app/core/constants/routes';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.loggedIn) {
      return true;
    }
    this.router.navigateByUrl(`/${AppRoutingConstants.AUTH}`);
    this.authService.clearDate();
    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.loggedIn) {
        return true;
      }
      this.router.navigateByUrl(`/${AppRoutingConstants.AUTH}`);
      return false;
  }
}
