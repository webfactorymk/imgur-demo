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
    authToken.tokenType = jsonObject.tokenType;
    authToken.accountUsername = jsonObject.accountUsername;
    authToken.accountId = jsonObject.accountId;

    authToken.expiresIn = jsonObject.expiresIn;
    console.log(authToken.expiresIn);
    console.log(new Date(authToken.expiresIn));
    console.log('expiresIn', jsonObject.expiresIn);
    return authToken;
  }

  isTokenExpired(): boolean {
    if (!this.expiresIn) {
      return true;
    }

    return this.expiresIn <= new Date().valueOf();
  }
}
