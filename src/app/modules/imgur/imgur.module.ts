import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgurRoutingModule} from './imgur-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialogModule, MatIconModule} from '@angular/material';
import {GalleryComponent} from './components/gallery/gallery.component';
import {GalleryPreviewItemComponent} from './components/gallery/gallery-preview-item/gallery-preview-item.component';
import {GalleryItemDetailsDialogComponent} from './components/gallery/gallery-item-details-dialog/gallery-item-details-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ImgurRoutingModule,
    ScrollingModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    GalleryComponent,
    GalleryPreviewItemComponent,
    GalleryItemDetailsDialogComponent
  ],
  entryComponents: [
    GalleryItemDetailsDialogComponent
  ]
})
export class ImgurModule {
}
