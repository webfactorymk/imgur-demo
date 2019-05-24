import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgurRoutingModule} from './imgur-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialogModule, MatIconModule} from '@angular/material';
import {ImagesPreviewComponent} from './components/images-preview/images-preview.component';
import {ImagePreviewItemComponent} from './components/images-preview/image-preview-item/image-preview-item.component';
import {GalleryItemDetailsDialogComponent} from './components/images-preview/gallery-item-details-dialog/gallery-item-details-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ImgurRoutingModule,
    ScrollingModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    ImagesPreviewComponent,
    ImagePreviewItemComponent,
    GalleryItemDetailsDialogComponent
  ],
  entryComponents: [
    GalleryItemDetailsDialogComponent
  ]
})
export class ImgurModule {
}
