import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthToken} from '../../models/auth-token.model';
import {AuthService} from '../../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'ngd-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  private _isAuthProcessingInProgress = true;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._parseAndStoreAuthDetails();
  }

  /**
   * We get the ActivatedRouteSnapshot instead of subscribing since this data we are not interested in the url change at this time
   * If there is no fragment in the URL, then we won't even pass the CanActivateLoginCallbackGuard
   * When we get the fragment, we generally remove it from the URL in the browser so the user does not have time to look at it
   * Removing it basically means opening the same route, while replacing the old one with the actual authToken data
   */
  private _parseAndStoreAuthDetails(): void {
    const routeFragment = this._activatedRoute.snapshot.fragment;
    this._router.navigate([], {replaceUrl: true, preserveFragment: false});

    const authToken = this._createAuthToken(new URLSearchParams(routeFragment));
    this._authService.login(authToken);

    this._router.navigate(['/']);
  }

  private _createAuthToken(urlSearchParams: URLSearchParams): AuthToken {
    return AuthToken.buildFrom({
      accessToken: urlSearchParams.get('access_token'),
      refreshToken: urlSearchParams.get('refresh_token'),
      expiresIn: moment().add(+urlSearchParams.get('expires_in'), 'seconds').valueOf(),
      tokenType: urlSearchParams.get('token_type'),
      accountUsername: urlSearchParams.get('account_username'),
      accountId: urlSearchParams.get('account_id'),
    });
  }
}
