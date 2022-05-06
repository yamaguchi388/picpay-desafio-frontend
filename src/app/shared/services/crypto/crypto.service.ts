import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class CryptoService {
  private readonly secretKey = environment.secret_key;

  encrypt(value: string) {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(value: string) {
    return CryptoJS.AES.decrypt(value, this.secretKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
