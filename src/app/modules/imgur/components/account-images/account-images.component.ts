import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ImgurHttpService} from '../../common/services/imgur-http.service';
import {ImgurImage} from '../../common/models/imgur-image.model';
import {Observable, of, Subscription} from 'rxjs';
import {PagedList} from '../../common/models/paged-list.model';
import {MatSnackBar} from '@angular/material';
import {SubscriptionUtils} from '../../../shared/util/subscription.utils';

@Component({
  selector: 'ngd-account-images',
  templateUrl: './account-images.component.html',
  styleUrls: ['./account-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountImagesComponent implements OnInit, OnDestroy {
  pagedList: PagedList<ImgurImage>;
  isPageRequestInProgress = false;

  accountImages$: Observable<Array<ImgurImage>>;

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

      this._dataSubscription = this._imgurHttpService.getImagesForLoggedInAccount(page)
        .subscribe((items: Array<ImgurImage>) => {
          this.pagedList.addItems(page, items);

          // Change the observable to have the newest values
          // NOTE: If we had something like this.pagedList.getItems() in the HTML
          // it may result with method invocations being done from every change detection source like scroll, click etc..
          // and it may slow down performance, but here the changes will be rendered only now
          this.accountImages$ = of(this.pagedList.getItems());
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
