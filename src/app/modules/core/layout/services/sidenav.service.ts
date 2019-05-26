import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {SidenavState} from '../models/sidenav-state';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {SidenavVisibilityState} from '../models/sidenav-visibility-state.enum';
import {SubscriptionUtils} from '../../../shared/util/subscription.utils';
import {distinctUntilChanged} from 'rxjs/operators';
import {SidenavItem} from '../components/sidenav/sidenav-item/sidenav-item.interface';

@Injectable()
export class SidenavService implements OnDestroy {
  private _sidenavState: BehaviorSubject<SidenavState>;
  sidenavState$: Observable<SidenavState>;

  private _sidenavItems: BehaviorSubject<Array<SidenavItem>>;
  sidenavItems$: Observable<Array<SidenavItem>>;
  private initialSidenavItems: Array<SidenavItem> = [
    {
      name: 'Screens'
    },
    {
      name: 'Imgur',
      route: '/imgur',
      matIconName: 'photo_library',
      subItems: [
        {
          name: 'Top images',
          route: '/imgur/top-images',
          matIconName: 'show_chart'
        },
        {
          name: 'My uploads',
          route: '/imgur/account-images',
          matIconName: 'view_comfy'
        },
        {
          name: 'Upload',
          route: '/imgur/upload',
          matIconName: 'add_photo_alternate'
        }]
    }];

  private _isHandsetDeviceBreakpointSubscription: Subscription;

  get sidenavState(): SidenavState {
    return this._sidenavState.getValue();
  }

  constructor(private _breakpointObserver: BreakpointObserver) {
    // With isMatched we can instantly get the starting device size value and set the initial
    // BehaviorSubject value, and continue subscribing to changes afterwards
    // If we only wait for the subscription, we cannot guarantee an instant response
    // So we may end up messing the sidenav on some initial app loads
    const isHandsetDeviceSize = this._breakpointObserver.isMatched(Breakpoints.Handset);

    this._sidenavState = new BehaviorSubject<SidenavState>({
      mode: isHandsetDeviceSize ? 'over' : 'side',
      value: isHandsetDeviceSize ? SidenavVisibilityState.Collapsed : SidenavVisibilityState.Expanded
    });
    this.sidenavState$ = this._sidenavState.asObservable();

    this._sidenavItems = new BehaviorSubject(this.initialSidenavItems);
    this.sidenavItems$ = this._sidenavItems.asObservable();

    this._subscribeToWebBreakpointObserver();
  }

  private _subscribeToWebBreakpointObserver() {
    this._isHandsetDeviceBreakpointSubscription = this._breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(breakpointState =>
        this._determineSidenavState(breakpointState)
      );
  }

  private _determineSidenavState(breakpointState: BreakpointState) {
    const currentSidenavState = this.sidenavState;
    const nextSidenavState = Object.assign(currentSidenavState, {
      mode: breakpointState.matches ? 'over' : 'side'
    });

    if (breakpointState.matches && currentSidenavState.value === SidenavVisibilityState.Expanded) {
      nextSidenavState.value = SidenavVisibilityState.Collapsed;
    }

    this._sidenavState.next(nextSidenavState);
  }

  toggleSidenav(): void {
    const currentSidenavState = this.sidenavState;
    this._sidenavState.next(
      Object.assign(currentSidenavState, {
        value: currentSidenavState.value === SidenavVisibilityState.Expanded
          ? SidenavVisibilityState.Collapsed
          : SidenavVisibilityState.Expanded
      })
    );
  }

  collapseSidenav(): void {
    this._sidenavState.next(
      Object.assign(this.sidenavState, {
        value: SidenavVisibilityState.Collapsed
      })
    );
  }

  ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this._isHandsetDeviceBreakpointSubscription);
  }
}
