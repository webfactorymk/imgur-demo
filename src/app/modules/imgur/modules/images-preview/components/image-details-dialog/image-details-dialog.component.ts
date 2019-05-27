import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ImgurImage} from '../../../../common/models/imgur-image.model';

@Component({
  selector: 'ngd-image-details-dialog',
  templateUrl: './image-details-dialog.component.html'
})
export class ImageDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public item: ImgurImage) {
  }
}
