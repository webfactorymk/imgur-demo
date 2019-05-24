import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthToken} from '../../model/auth-token.model';
import {AuthService} from '../../services/auth.service';

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

  ngOnInit() {
    this._parseAndStoreAuthDetails();
  }

  private _parseAndStoreAuthDetails(): void {
    // We get the snapshot instead of subscribing because this data won't change
    // so there is no need to observe the activatedRoute fragment
    const routeFragment = this._activatedRoute.snapshot.fragment;
    if (!routeFragment) {
      this._router.navigate(['/auth/login']);
      // this._router.navigate returns a Promise so we stop executing here
      return;
    }

    // If we have a fragment, we should show the same component and parse the fragment,
    // but remove the fragment from the URL since we don't need the end user looking at it
    this._router.navigate([], {replaceUrl: true, preserveFragment: false});

    const authToken = this._createAuthToken(new URLSearchParams(routeFragment));
    this._authService.login(authToken);

    this._router.navigate(['/']);
  }

  private _createAuthToken(urlSearchParams: URLSearchParams): AuthToken {
    return AuthToken.buildFrom({
      accessToken: urlSearchParams.get('access_token'),
      refreshToken: urlSearchParams.get('refresh_token'),
      expiresIn: urlSearchParams.get('expires_in'),
      tokenType: urlSearchParams.get('token_type'),
      accountUsername: urlSearchParams.get('account_username'),
      accountId: urlSearchParams.get('account_id'),
    });
  }
}
