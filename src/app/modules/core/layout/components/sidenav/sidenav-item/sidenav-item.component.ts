import {Component, Input} from '@angular/core';
import {SidenavItem} from './sidenav-item.interface';
import {Router} from '@angular/router';
import {SidenavService} from '../../../common/services/sidenav.service';

@Component({
  selector: 'ngd-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent {
  @Input() item: SidenavItem;
  @Input() itemLevel = 1;

  constructor(private _router: Router,
              private _sidenavService: SidenavService) {
  }

  isRouteActive() {
    if (this.isString(this.item.routeOrFunction)) {
      return this._router.isActive(this._router.parseUrl(this.item.routeOrFunction), false);
    } else {
      return false;
    }
  }

  invokeRouteOrFunction() {
    if (this.isString(this.item.routeOrFunction)) {
      this._router.navigate([this.item.routeOrFunction]);
    } else if (this.isFunction(this.item.routeOrFunction)) {
      this.item.routeOrFunction();
    }

    // If it's a mobile sidenav, we might as well close it
    if (this._sidenavService.sidenavState.mode === 'over') {
      this._sidenavService.collapseSidenav();
    }
  }

  isString(valueToTest): boolean {
    return typeof valueToTest === 'string' || valueToTest instanceof String;
  }

  isFunction(valueToTest): boolean {
    return typeof valueToTest === 'function' || valueToTest instanceof Function;
  }
}
