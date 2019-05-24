import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class CanActivateLoginGuard implements CanActivate {

  constructor(private _router: Router,
              private _authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.isLoggedIn()) {
      console.log('Already logged in, no need to go to login');
      console.log('CanActivate failed for CanActivateLoginGuard, navigating to \/');
      this._router.navigate(['/']);
      return false;
    }

    return true;
  }
}
