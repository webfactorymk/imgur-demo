import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {SidenavState} from '../models/sidenav-state';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {SidenavVisibilityState} from '../models/sidenav-visibility-state.enum';
import {SubscriptionUtils} from '../../../shared/util/subscription.utils';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable()
export class SidenavService implements OnDestroy {
  private _sidenavState: BehaviorSubject<SidenavState>;
  sidenavState$: Observable<SidenavState>;

  private _isHandsetDeviceBreakpointSubscription: Subscription;

  private get sidenavState(): SidenavState {
    return this._sidenavState.getValue();
  }

  private set sidenavState(sidenavState: SidenavState) {
    this._sidenavState.next(sidenavState);
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

    this.sidenavState = nextSidenavState;
  }

  toggleSidenav(): void {
    const currentSidenavState = this.sidenavState;
    this.sidenavState = Object.assign(currentSidenavState, {
      value: currentSidenavState.value === SidenavVisibilityState.Expanded
        ? SidenavVisibilityState.Collapsed
        : SidenavVisibilityState.Expanded
    });
  }

  collapseSidenav(): void {
    this.sidenavState = Object.assign(this.sidenavState, {
      value: SidenavVisibilityState.Collapsed
    });
  }

  ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this._isHandsetDeviceBreakpointSubscription);
  }
}
