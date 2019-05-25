import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  entryComponents: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmationDialogModule {
}
