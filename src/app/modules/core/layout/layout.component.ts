import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SidenavService} from './services/sidenav.service';
import {SidenavState} from './models/sidenav-state';
import {SubscriptionUtils} from '../../shared/util/subscription.utils';
import {AuthService} from '../../auth/services/auth.service';
import {SidenavVisibilityState} from './models/sidenav-visibility-state.enum';

@Component({
  selector: 'ngd-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnDestroy {
  // Get all the states so that we can use them in the HTML
  // This will help with future refactors and adding of new states
  // So we do not have to search for strings to replace
  sidenavVisibilityStates = SidenavVisibilityState;

  // Get's the observable for the sidenavState so that we can async pipe it's value
  // This way we do not need to unsubscribe from anything ourselves
  sidenavState$: Observable<SidenavState>;

  private _isHandsetDeviceBreakpointSubscription: Subscription;

  constructor(private _layoutService: SidenavService,
              private _authService: AuthService) {
    this.sidenavState$ = this._layoutService.sidenavState$;
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
