import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class CanActivateLoginCallbackGuard implements CanActivate {

  constructor(private _router: Router) {
  }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!activatedRouteSnapshot.fragment) {
      console.log('CanActivate failed for CanActivateLoginCallbackGuard, navigating to login');
      this._router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
