import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngd-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() shownInCenter = true;
  @Input() textToShow;
  @Input() diameter = 40;
}
