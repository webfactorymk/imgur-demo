import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ImgurImage} from '../../common/imgur-image.model';

@Component({
  selector: 'ngd-image-details-dialog',
  templateUrl: './image-details-dialog.component.html',
  styleUrls: ['./image-details-dialog.component.scss']
})
export class ImageDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public item: ImgurImage) {
  }
}
