import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  set(key: string, value: any): boolean {
    if (sessionStorage) {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (sessionStorage) {
      return JSON.parse(sessionStorage.getItem(key));
    }
    return null;
  }

  remove(key: string): boolean {
    if (sessionStorage) {
      sessionStorage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (sessionStorage) {
      sessionStorage.clear();
      return true;
    }
    return false;
  }
}
