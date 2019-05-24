import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ImgurImage} from '../../../models/imgur-image.model';

@Component({
  selector: 'ngd-gallery-item-details-dialog',
  templateUrl: './gallery-item-details-dialog.component.html',
  styleUrls: ['./gallery-item-details-dialog.component.scss']
})
export class GalleryItemDetailsDialogComponent implements OnInit {
  constructor(private _matDialogRef: MatDialogRef<GalleryItemDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public item: ImgurImage) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this._matDialogRef.close();
  }
}
