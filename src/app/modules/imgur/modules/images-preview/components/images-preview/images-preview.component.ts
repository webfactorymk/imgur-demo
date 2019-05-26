import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ImgurImage} from '../../../../common/imgur-image.model';
import {Observable, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ImageDetailsDialogComponent} from '../image-details-dialog/image-details-dialog.component';
import {SubscriptionUtils} from '../../../../../shared/util/subscription.utils';
import {ScrollDispatcher} from '@angular/cdk/overlay';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'ngd-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesPreviewComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) virtualScrollViewport: CdkVirtualScrollViewport;

  @Input() showLoadingSpinner: boolean;
  @Input() images$: Observable<Array<ImgurImage>>;
  @Output() requestNextPage = new EventEmitter();

  private _scrollingInfoSubscription: Subscription;

  constructor(private _matDialog: MatDialog,
              private _scrollDispatcher: ScrollDispatcher) {
  }

  ngOnInit() {
    this._subscribeToScrollEvents();
  }

  private _subscribeToScrollEvents() {
    this._scrollingInfoSubscription = this._scrollDispatcher.scrolled()
      .pipe(
        // debounceTime(150),
        map(() => (
          // All items have been rendered on screen, we can request a new page
          this.virtualScrollViewport.getDataLength() -
          this.virtualScrollViewport.getRenderedRange().end) <= 10),
        distinctUntilChanged()
      )
      .subscribe((shouldRequestNextPage) => {
        console.log(shouldRequestNextPage);
        if (shouldRequestNextPage) {
          this.requestNextPage.emit();
        }
      });
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

  ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this._scrollingInfoSubscription);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
