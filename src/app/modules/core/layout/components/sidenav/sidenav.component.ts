import {Component} from '@angular/core';
import {SidenavItem} from './sidenav-item/sidenav-item.interface';
import {Observable} from 'rxjs';
import {SidenavService} from '../../common/services/sidenav.service';

@Component({
  selector: 'ngd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  sidenavItems$: Observable<Array<SidenavItem>>;

  constructor(private _sidenavService: SidenavService) {
    this.sidenavItems$ = this._sidenavService.sidenavItems$;
  }
}
