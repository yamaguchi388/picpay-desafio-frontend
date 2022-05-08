import { Injectable } from '@angular/core';
import { StorageKeysEnum } from '../../enums';

import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private readonly cryptoService: CryptoService) {}

  setItem(key: StorageKeysEnum, value: object | string) {
    const payload = this.cryptoService.encrypt(JSON.stringify(value));
    localStorage.setItem(key, payload.toString());
  }

  getItem(key: StorageKeysEnum) {
    const value = localStorage.getItem(key);

    if (value) {
      const payload = this.cryptoService.decrypt(value);
      return this.tryParseStorageValue(payload);
    }
  }

  private tryParseStorageValue(value: string) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value ?? '';
    }
  }

  removeItem(key: StorageKeysEnum) {
    localStorage.removeItem(key);
  }
}
