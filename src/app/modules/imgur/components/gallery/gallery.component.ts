import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ImgurHttpService} from '../../services/imgur-http.service';
import {ImgurImage} from '../../models/imgur-image.model';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {GalleryItemDetailsDialogComponent} from './gallery-item-details-dialog/gallery-item-details-dialog.component';

@Component({
  selector: 'ngd-imgur-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  accountImages$: Observable<Array<ImgurImage>>;

  constructor(private _matDialog: MatDialog,
              private _imgurHttpService: ImgurHttpService) {
  }

  ngOnInit() {
    this.accountImages$ = this._imgurHttpService.getImagesForLoggedInAccount();
    // .subscribe((accountImages: Array<ImgurImage>) => {
    //   console.log(result);
    // });
  }

  onScrolledIndexChange(event: any) {
  }

  trackByImageIdFn(index, item) {
    return item ? item.id : index;
  }

  showItemDetails(item: ImgurImage) {
    this._matDialog.open(GalleryItemDetailsDialogComponent, {
      maxHeight: '80vh',
      data: item
    });
  }
}
