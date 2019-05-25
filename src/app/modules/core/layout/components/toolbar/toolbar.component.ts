import {Component, OnInit} from '@angular/core';
import {SidenavService} from '../../services/sidenav.service';

@Component({
  selector: 'ngd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private _layoutService: SidenavService) {
  }

  ngOnInit() {
  }

  toggleSidenav() {
    this._layoutService.toggleSidenav();
  }

}
