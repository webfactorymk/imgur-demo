import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@angular/material';
import {ImagesPreviewComponent} from './components/images-preview/images-preview.component';
import {ImagePreviewItemComponent} from './components/image-preview-item/image-preview-item.component';
import {ImageDetailsDialogComponent} from './components/image-details-dialog/image-details-dialog.component';
import {LoadingSpinnerModule} from '../../../shared/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [
    ImagesPreviewComponent,
    ImagePreviewItemComponent,
    ImageDetailsDialogComponent
  ],
  entryComponents: [ImageDetailsDialogComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    LoadingSpinnerModule
  ],
  exports: [
    ImagesPreviewComponent
  ]
})
export class ImagesPreviewModule {
}
