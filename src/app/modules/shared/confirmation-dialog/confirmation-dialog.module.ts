import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [ConfirmationDialogComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule {
}
