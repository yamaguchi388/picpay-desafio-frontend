import { Injectable } from "@angular/core";
import { StorageKeysEnum } from "../../enums";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  setItem(key: StorageKeysEnum, value: object | string) {
    if (typeof value === "object") {
      sessionStorage.setItem(key, JSON.stringify(value));
      return;
    }

    sessionStorage.setItem(key, value);
  }

  getItem(key: StorageKeysEnum) {
    const value = sessionStorage.getItem(key);

    try {
      return JSON.parse(value!);
    } catch (error) {
      return value ?? "";
    }
  }

  removeItem(key: StorageKeysEnum) {
    sessionStorage.removeItem(key);
  }
}
