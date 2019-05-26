import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from './loading-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoadingSpinnerComponent
  ]
})
export class LoadingSpinnerModule {
}
