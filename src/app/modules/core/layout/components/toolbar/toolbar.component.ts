import {Component} from '@angular/core';
import {SidenavService} from '../../services/sidenav.service';

@Component({
  selector: 'ngd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private _layoutService: SidenavService) {
  }

  toggleSidenav() {
    this._layoutService.toggleSidenav();
  }
}
