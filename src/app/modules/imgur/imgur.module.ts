import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgurRoutingModule} from './imgur-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule, MatDialogModule, MatIconModule} from '@angular/material';
import {ImagesPreviewComponent} from './components/images-preview/images-preview.component';
import {ImagePreviewItemComponent} from './components/images-preview/image-preview-item/image-preview-item.component';
import {ImgurComponent} from './components/imgur/imgur.component';
import {ImageDetailsDialogComponent} from './components/image-details-dialog/image-details-dialog.component';
import {ImagesUploadComponent} from './components/images-upload/images-upload.component';
import {CanvasWhiteboardModule} from 'ng2-canvas-whiteboard';
import {LoadingOverlayModule} from '../shared/loading-overlay/loading-overlay.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FileDropModule} from 'ngx-file-drop';
import {ConfirmationDialogModule} from '../shared/confirmation-dialog/confirmation-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImgurRoutingModule,
    ScrollingModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    LoadingOverlayModule,
    CanvasWhiteboardModule,
    FileDropModule,
    ConfirmationDialogModule
  ],
  declarations: [
    ImagesPreviewComponent,
    ImagePreviewItemComponent,
    ImageDetailsDialogComponent,
    ImgurComponent,
    ImagesUploadComponent
  ],
  entryComponents: [
    ImageDetailsDialogComponent
  ]
})
export class ImgurModule {
}
