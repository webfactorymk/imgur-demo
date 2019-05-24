import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {LayoutService} from './services/layout.service';
import {SidenavState} from './sidenav-state.enum';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {SubscriptionUtils} from '../../shared/util/subscription.utils';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'ngd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {
  // Get all the states so that we can use them in the HTML
  // This will help with future refactors and adding of new states
  // So we do not have to search for strings to replace
  sidenavStates = SidenavState;

  // Get's the observable for the sidenavState so that we can async pipe it's value
  // This way we do not need to unsubscribe from anything ourselves
  sidenavState$: Observable<SidenavState>;
  sidenavMode = 'side';

  private _isHandsetDeviceBreakpointSubscription: Subscription;

  constructor(private _layoutService: LayoutService,
              private _breakpointObserver: BreakpointObserver,
              private _authService: AuthService) {
    this.sidenavState$ = this._layoutService.sidenavState$;
  }

  ngOnInit(): void {
    this._subscribeToWebBreakpointObserver();
  }

  private _subscribeToWebBreakpointObserver() {
    this._isHandsetDeviceBreakpointSubscription = this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((breakpointState: BreakpointState) => {
        this.sidenavMode = breakpointState.matches ? 'over' : 'side';

        if (breakpointState.matches && this._layoutService.isSidenavExpanded()) {
          this._layoutService.collapseSidenav();
        }
      });
  }

  logout(): void {
    this._authService.logout();
  }

  sidenavClosedStart(): void {
    this._layoutService.collapseSidenav();
  }

  ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this._isHandsetDeviceBreakpointSubscription);
  }
}
