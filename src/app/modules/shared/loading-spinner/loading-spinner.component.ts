import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngd-loading-spinner',
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent {
  @Input() shownInCenter = true;
  @Input() textToShow;
  @Input() diameter = 40;
}
