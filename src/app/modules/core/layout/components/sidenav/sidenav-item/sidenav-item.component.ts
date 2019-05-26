import {Component, Input} from '@angular/core';
import {SidenavItem} from './sidenav-item.interface';
import {Router} from '@angular/router';
import {SidenavService} from '../../../services/sidenav.service';

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
    return this._router.isActive(this._router.parseUrl(this.item.route), false);
  }

  commenceRouteChange() {
    this._router.navigate([this.item.route]);

    // If it's a mobile sidenav, we might as well close it
    if (this._sidenavService.sidenavState.mode === 'over') {
      this._sidenavService.collapseSidenav();
    }
  }
}
