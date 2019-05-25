import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ConfirmationDialogData} from './confirmation-dialog-data.model';

@Component({
  selector: 'ngd-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: ConfirmationDialogData) {
  }
}
