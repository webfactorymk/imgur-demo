export class AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  accountUsername: string;
  accountId: string;

  static buildFrom(jsonObject): AuthToken {
    const authToken: AuthToken = new AuthToken();
    authToken.accessToken = jsonObject.accessToken;
    authToken.refreshToken = jsonObject.refreshToken;
    authToken.expiresIn = +jsonObject.expiresIn;
    authToken.tokenType = jsonObject.tokenType;
    authToken.accountUsername = jsonObject.accountUsername;
    authToken.accountId = jsonObject.accountId;

    return authToken;
  }

  isTokenExpired(): boolean {
    const date = this._getTokenExpirationDate();
    if (date == null) {
      return false;
    }
    // Token expired?
    return !(date.valueOf() > new Date().valueOf() * 1000);
  }

  private _getTokenExpirationDate() {
    // The 0 here is the key, which sets the date to the epoch
    const date = new Date(0);
    date.setUTCSeconds(this.expiresIn);
    return date;
  }
}
