import {TestBed} from '@angular/core/testing';
import {ImgurAuthService} from './imgur-auth.service';
import {AuthToken} from '../models/auth-token.model';
import * as moment from 'moment';
import {isEqual} from 'lodash-es';

describe('ImgurAuthService', () => {
  let service: ImgurAuthService;
  let testAuthToken: AuthToken;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ImgurAuthService]});
    testAuthToken = AuthToken.buildFrom({
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken',
      expiresIn: moment().add(20, 'days').valueOf(),
      tokenType: 'bearer',
      accountUsername: 'testUsername',
      accountId: 'testAccountId'
    });

    setupLocalStorageSpies();
  });

  const setupLocalStorageSpies = () => {
    let store = {};

    spyOn(localStorage, 'getItem')
      .and.callFake((key: string): string => store[key] || null);

    spyOn(localStorage, 'removeItem')
      .and.callFake((key: string): boolean => delete store[key]);

    spyOn(localStorage, 'setItem')
      .and.callFake((key: string, value: string): string => store[key] = value);

    spyOn(localStorage, 'clear')
      .and.callFake(() => store = {});
  };

  it('should not be logged in with an empty storage', (done: DoneFn) => {
    service = TestBed.get(ImgurAuthService);

    expect(service.isLoggedIn()).toBe(false);
    expect(service.getAccessToken()).toBe(null);
    expect(service.getCurrentAuthToken()).toBe(null);

    service.authToken$.subscribe((authToken) => {
      expect(authToken).toBe(null);
      done();
    });
  });

  it('should not save invalid auth tokens', (done: DoneFn) => {
    service = TestBed.get(ImgurAuthService);

    testAuthToken.accessToken = null;

    service.login(testAuthToken);

    expect(service.isLoggedIn()).toBe(false);
    expect(service.getAccessToken()).toBe(null);
    expect(service.getCurrentAuthToken()).toBe(null);

    service.authToken$.subscribe((authToken) => {
      expect(authToken).toBe(null);
      done();
    });
  });

  it('should save auth token data on login()', (done: DoneFn) => {
    service = TestBed.get(ImgurAuthService);

    expect(service.isLoggedIn()).toBe(false);
    expect(service.getAccessToken()).toBe(null);
    expect(service.getCurrentAuthToken()).toBe(null);

    service.login(testAuthToken);

    expect(service.isLoggedIn()).toBe(true);
    expect(service.getAccessToken()).toBe(testAuthToken.accessToken);
    expect(isEqual(service.getCurrentAuthToken(), testAuthToken)).toBe(true);

    service.authToken$.subscribe((authToken) => {
      expect(isEqual(authToken, testAuthToken)).toBe(true);
      done();
    });
  });

  it('should clear auth data on logout()', (done: DoneFn) => {
    service = TestBed.get(ImgurAuthService);

    service.login(testAuthToken);

    expect(service.isLoggedIn()).toBe(true);
    expect(service.getAccessToken()).toBe(testAuthToken.accessToken);
    expect(service.getCurrentAuthToken()).toBe(testAuthToken);

    service.logout();

    expect(service.isLoggedIn()).toBe(false);
    expect(service.getAccessToken()).toBe(null);
    expect(service.getCurrentAuthToken()).toBe(null);

    service.authToken$.subscribe((authToken) => {
      expect(authToken).toBe(null);
      done();
    });
  });

  it('should get auth from storage in constructor if it exists', (done: DoneFn) => {
    localStorage.setItem(ImgurAuthService.AUTH_TOKEN_STORAGE_KEY_NAME, JSON.stringify(testAuthToken));

    service = TestBed.get(ImgurAuthService);

    expect(service.isLoggedIn()).toBe(true);
    expect(service.getAccessToken()).toBe(testAuthToken.accessToken);
    expect(isEqual(service.getCurrentAuthToken(), testAuthToken)).toBe(true);

    service.authToken$.subscribe((authToken) => {
      expect(isEqual(authToken, testAuthToken)).toBe(true);
      done();
    });
  });
});
