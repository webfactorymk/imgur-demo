import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../services/layout.service';

@Component({
  selector: 'ngd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private _layoutService: LayoutService) {
  }

  ngOnInit() {
  }

}
