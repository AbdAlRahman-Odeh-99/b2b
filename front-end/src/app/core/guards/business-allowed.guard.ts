import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth/auth.service';
import { BusinessRoutingConstants } from '@app/core/constants/routes';
import { Permissions } from '@app/core/constants/permissions';

@Injectable({
  providedIn: 'root'
})
export class BusinessAllowedGuard implements CanActivate {  // , CanActivateChild, CanDeactivate<unknown>, CanLoad

  constructor(
    private authService: AuthService,
  ) { }

  findRoleType(url: string): string {
    let type = 'guest';
    Permissions.forEach((userType) => {
      userType.permissions.forEach((permission) => {
        if (url.includes(permission)) {
          type = userType.roleName;
        }
      });
    });
    return type;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isHasRole(this.findRoleType(state.url));
  }
  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
