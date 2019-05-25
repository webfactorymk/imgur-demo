import {Injectable} from '@angular/core';
import {AuthToken} from '../models/auth-token.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static AUTH_TOKEN_STORAGE_KEY_NAME = 'auth-token';

  private _authTokenSubject: BehaviorSubject<AuthToken>;
  authToken$: Observable<AuthToken>;

  constructor() {
    const authToken = this._retrieveAuthDetails();
    this._authTokenSubject = new BehaviorSubject<AuthToken>(authToken);
    this.authToken$ = this._authTokenSubject.asObservable();
  }

  getCurrentAuthToken(): AuthToken {
    return this._authTokenSubject.getValue();
  }

  getAccessToken(): string {
    const authToken = this.getCurrentAuthToken();
    return authToken ? authToken.accessToken : null;
  }

  isLoggedIn(): boolean {
    const authToken: AuthToken = this.getCurrentAuthToken();
    return authToken && !authToken.isTokenExpired();
  }

  private _retrieveAuthDetails(): AuthToken {
    const storedToken = localStorage.getItem(AuthService.AUTH_TOKEN_STORAGE_KEY_NAME);
    console.log('authToken in localStorage', storedToken);

    if (!storedToken) {
      return null;
    }

    return AuthToken.buildFrom(JSON.parse(storedToken));
  }

  login(authToken: AuthToken): void {
    this._storeAuthDetails(authToken);
    this._authTokenSubject.next(authToken);
  }

  private _storeAuthDetails(authToken: AuthToken): void {
    if (!authToken || !authToken.accessToken) {
      console.log('Invalid authToken, will not save in storage');
      return;
    }

    localStorage.setItem(AuthService.AUTH_TOKEN_STORAGE_KEY_NAME, JSON.stringify(authToken));
  }

  logout(): void {
    this._clearAuthDetails();
    this._authTokenSubject.next(null);
  }

  private _clearAuthDetails(): void {
    localStorage.removeItem(AuthService.AUTH_TOKEN_STORAGE_KEY_NAME);
  }
}
