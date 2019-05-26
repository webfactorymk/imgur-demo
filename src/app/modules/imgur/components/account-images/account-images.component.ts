import {Component, OnInit} from '@angular/core';
import {ImgurHttpService} from '../../common/imgur-http.service';
import {ImgurImage} from '../../common/imgur-image.model';
import {Observable, of} from 'rxjs';
import {PagedList} from '../../common/paged-list.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'ngd-account-images',
  templateUrl: './account-images.component.html',
  styleUrls: ['./account-images.component.scss']
})
export class AccountImagesComponent implements OnInit {
  pagedList: PagedList<ImgurImage>;
  isPageRequestInProgress = false;

  accountImages$: Observable<Array<ImgurImage>>;

  constructor(private _snackBar: MatSnackBar,
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

      this._imgurHttpService.getImagesForLoggedInAccount(page)
        .subscribe((items: Array<ImgurImage>) => {
          this.pagedList.addItems(page, items);

          // Change the observable to have the newest values
          // NOTE: If we had something like this.pagedList.getItems() in the HTML
          // it may result with method invocations being done from every change detection source like scroll, click etc..
          // and it may slow down performance, but here the changes will be rendered only now
          this.accountImages$ = of(this.pagedList.getItems());

          this.isPageRequestInProgress = false;
        }, (err) => {
          this._snackBar.open(`An error occurred while fetching account images, ${err.message}`, 'Dismiss');
          this.isPageRequestInProgress = false;
        });
    }
  }

  fetchNextPage() {
    if (this.pagedList.hasNextPage()) {
      this.getImagesForLoggedInAccount(this.pagedList.nextPage());
    }
  }
}
