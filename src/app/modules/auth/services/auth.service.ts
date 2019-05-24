import {Injectable} from '@angular/core';
import {AuthToken} from '../model/auth-token.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static AUTH_TOKEN_STORAGE_KEY_NAME = 'auth-token';

  private _authTokenSource: BehaviorSubject<AuthToken>;

  constructor() {
    const authToken = this._retrieveAuthDetails();
    console.log('Deserialized authToken', authToken);
    this._authTokenSource = new BehaviorSubject<AuthToken>(authToken);
  }

  private get authTokenSource(): AuthToken {
    return this._authTokenSource.getValue();
  }

  private set authTokenSource(authToken: AuthToken) {
    this._authTokenSource.next(authToken);
  }

  getAccessToken(): string {
    const authToken = this.authTokenSource;
    return authToken ? authToken.accessToken : null;
  }

  isLoggedIn(): boolean {
    const authToken: AuthToken = this.authTokenSource;
    return authToken && !authToken.isTokenExpired();
  }

  login(authToken: AuthToken): void {
    this._storeAuthDetails(authToken);
    this.authTokenSource = authToken;
  }

  private _storeAuthDetails(authToken: AuthToken): void {
    if (!authToken || !authToken.accessToken) {
      console.log('Invalid authToken, will not save in storage');
      return;
    }

    localStorage.setItem(AuthService.AUTH_TOKEN_STORAGE_KEY_NAME, JSON.stringify(authToken));
  }

  private _retrieveAuthDetails(): AuthToken {
    const storedToken = localStorage.getItem(AuthService.AUTH_TOKEN_STORAGE_KEY_NAME);
    console.log('authToken in localStorage', storedToken);

    if (!storedToken) {
      return null;
    }

    return AuthToken.buildFrom(JSON.parse(storedToken));
  }

  logout() {
    this._clearAuthDetails();
    this.authTokenSource = null;
  }

  private _clearAuthDetails(): void {
    localStorage.removeItem(AuthService.AUTH_TOKEN_STORAGE_KEY_NAME);
  }
}
