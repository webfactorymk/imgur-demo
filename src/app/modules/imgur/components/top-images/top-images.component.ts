import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PagedList} from '../../common/models/paged-list.model';
import {ImgurImage} from '../../common/models/imgur-image.model';
import {Observable, of, Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {ImgurHttpService} from '../../common/services/imgur-http.service';
import {SubscriptionUtils} from '../../../shared/util/subscription.utils';

@Component({
  selector: 'ngd-top-images',
  templateUrl: './top-images.component.html',
  styleUrls: ['./top-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopImagesComponent implements OnInit, OnDestroy {
  pagedList: PagedList<ImgurImage>;
  isPageRequestInProgress = false;

  topImages$: Observable<Array<ImgurImage>>;

  private _dataSubscription: Subscription;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _snackBar: MatSnackBar,
              private _imgurHttpService: ImgurHttpService) {
    this.pagedList = new PagedList();
  }

  ngOnInit() {
    this.getImagesForLoggedInAccount(this.pagedList.currentPage());
  }

  getImagesForLoggedInAccount(page: number) {
    // Do not send multiple requests for the same data
    if (!this.isPageRequestInProgress) {
      this.isPageRequestInProgress = true;
      this._changeDetector.detectChanges();

      this._dataSubscription = this._imgurHttpService.getTopImages(page)
        .subscribe((items: Array<ImgurImage>) => {
          this.pagedList.addItems(page, items);

          // Change the observable to have the newest values
          // NOTE: If we had something like this.pagedList.getItems() in the HTML
          // it may result with that method invocation being done from every change detection source like scroll, click etc..
          // and it may slow down performance, but here the changes will be rendered only now
          this.topImages$ = of(this.pagedList.getItems());
          this.isPageRequestInProgress = false;

          this._changeDetector.detectChanges();
        }, (err) => {
          this._snackBar.open(`An error occurred while fetching images, ${err.message}`, 'Dismiss');
          this.isPageRequestInProgress = false;

          this._changeDetector.detectChanges();
        });
    }
  }

  fetchNextPage() {
    if (this.pagedList.hasNextPage()) {
      this.getImagesForLoggedInAccount(this.pagedList.nextPage());
    }
  }

  ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this._dataSubscription);
  }
}
