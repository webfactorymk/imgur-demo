import {Component} from '@angular/core';
import {SidenavService} from '../../common/services/sidenav.service';

@Component({
  selector: 'ngd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private _sidenavService: SidenavService) {
  }

  toggleSidenav() {
    this._sidenavService.toggleSidenav();
  }
}
