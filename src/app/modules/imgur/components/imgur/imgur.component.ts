import {Component, OnDestroy} from '@angular/core';
import {SidenavService} from '../../../core/layout/common/services/sidenav.service';
import {ImgurAuthService} from '../../modules/auth/common/services/imgur-auth.service';
import {SidenavItem} from '../../../core/layout/components/sidenav/sidenav-item/sidenav-item.interface';
import {Subscription} from 'rxjs';
import {SubscriptionUtils} from '../../../shared/util/subscription.utils';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'ngd-imgur',
  templateUrl: './imgur.component.html',
  styleUrls: ['./imgur.component.scss']
})
export class ImgurComponent implements OnDestroy {
  private _authTokenSubscription: Subscription;

  constructor(private _router: Router,
              private _sidenavService: SidenavService,
              private _authService: ImgurAuthService) {
    this._subscribeToAuthTokenChanges();
  }

  private _subscribeToAuthTokenChanges() {
    this._authTokenSubscription = this._authService.authToken$
      .pipe(
        // We use delay to prevent messing around with Angular's initial changeDetection cycle
        delay(0)
      )
      .subscribe((authToken) => {
        const imgurSidenavItem: SidenavItem = {
          name: 'Imgur',
          routeOrFunction: '/imgur',
          matIconName: 'photo_library'
        };

        if (authToken) {
          imgurSidenavItem.subItems = this._generateAuthenticatedRoutes();
        } else {
          imgurSidenavItem.subItems = this._generateAnonymousRoutes();
        }

        this._sidenavService.addItem(imgurSidenavItem);
      });
  }

  private _generateAuthenticatedRoutes(): Array<SidenavItem> {
    return [
      {
        name: 'Top images',
        routeOrFunction: '/imgur/top-images',
        matIconName: 'show_chart'
      },
      {
        name: 'My uploads',
        routeOrFunction: '/imgur/account-images',
        matIconName: 'view_comfy'
      },
      {
        name: 'Upload',
        routeOrFunction: '/imgur/upload',
        matIconName: 'add_photo_alternate'
      },
      {
        name: 'Logout',
        routeOrFunction: () => {
          this._authService.logout();
          this._router.navigate(['/imgur/auth/login']);
        },
        matIconName: 'exit_to_app'
      }
    ];
  }

  private _generateAnonymousRoutes(): Array<SidenavItem> {
    return [
      {
        name: 'Login',
        routeOrFunction: '/imgur/auth/login',
        matIconName: 'launch'
      }
    ];
  }

  ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this._authTokenSubscription);
  }
}
