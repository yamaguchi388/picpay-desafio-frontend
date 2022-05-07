import { TestBed } from "@angular/core/testing";
import { StorageKeysEnum } from "../../enums";
import { CryptoService } from "../crypto/crypto.service";

import { StorageService } from "./storage.service";

describe("StorageService", () => {
  let service: StorageService;
  let cryptoService: CryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoService],
    });
    service = TestBed.inject(StorageService);
    cryptoService = TestBed.inject(CryptoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should store value on localStorage with string value", () => {
    const key = StorageKeysEnum.USER;
    const value = "mockValue";
    const cryptoValue = cryptoService.encrypt(value);

    spyOn(window.localStorage, "setItem");
    spyOn(cryptoService, "encrypt").and.returnValue(cryptoValue);

    service.setItem(key, value);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(key, cryptoValue);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("should get item string by key", () => {
    const key = StorageKeysEnum.USER;
    const value = "mockValue";

    const crytoValue = cryptoService.encrypt(value);
    spyOn(window.localStorage, "getItem").and.returnValue(crytoValue);

    const result = service.getItem(key);

    expect(window.localStorage.getItem).toHaveBeenCalledWith(key);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);

    expect(result).toEqual(value);
  });

  it("should remove item by key", () => {
    const key = StorageKeysEnum.USER;

    spyOn(window.localStorage, "removeItem");

    service.removeItem(key);

    expect(window.localStorage.removeItem).toHaveBeenCalledWith(key);
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1);
  });
});
