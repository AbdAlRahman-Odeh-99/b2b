// import { TokenAuthentication } from "@env/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenHandlerService {
  constructor() {}

  public getPayload(token) {
    let payLoad = null;
    try {
      payLoad = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      return payLoad;
    }
    return payLoad;
  }
  isTokenValid(token: string) {
    if (!token || token === "") {
      return false;
    }
    // const TokenExpirationLong = TokenAuthentication.TokenExpirationDaysLong;
    const payload = this.getPayload(token);
    if (!payload) {
      return false;
    }
    const expirationDate = +(payload.exp + "000");
    const currentDate = +Date.now();
    const dateDiff = expirationDate - currentDate;
    // TokenExpirationLong should be removed from here when we enable token checking in the backend
    return  (dateDiff > 0 ? true : false);
  }
}
