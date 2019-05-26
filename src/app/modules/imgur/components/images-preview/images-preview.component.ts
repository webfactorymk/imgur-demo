import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ImgurHttpService} from '../../common/imgur-http.service';
import {ImgurImage} from '../../common/imgur-image.model';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ImageDetailsDialogComponent} from '../image-details-dialog/image-details-dialog.component';

@Component({
  selector: 'ngd-imgur-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesPreviewComponent implements OnInit {
  accountImages$: Observable<Array<ImgurImage>>;

  constructor(private _matDialog: MatDialog,
              private _imgurHttpService: ImgurHttpService) {
  }

  ngOnInit() {
    this.accountImages$ = this._imgurHttpService.getImagesForLoggedInAccount(0);
  }

  onScrolledIndexChange(event: any) {
  }

  trackByImageIdFn(index, item) {
    return item ? item.id : index;
  }

  showItemDetails(item: ImgurImage) {
    this._matDialog.open(ImageDetailsDialogComponent, {
      maxHeight: '95vh',
      width: '90vw',
      data: item
    });
  }
}
