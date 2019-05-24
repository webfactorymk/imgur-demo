import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoadingOverlayComponent} from './loading-overlay.component';
import {MatProgressBarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [LoadingOverlayComponent],
  exports: [LoadingOverlayComponent]
})
export class LoadingOverlayModule {
}
