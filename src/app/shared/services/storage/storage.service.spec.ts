import { TestBed } from '@angular/core/testing';
import { StorageKeysEnum } from '../../enums';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store value on sessionStorage with string value', () => {
    spyOn(window.sessionStorage, 'setItem');

    const key = StorageKeysEnum.USER;
    const value = 'mockValue';
    service.setItem(key, value);

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(key, value);
    expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should store value on sessionStorage with object value', () => {
    spyOn(window.sessionStorage, 'setItem');

    const key = StorageKeysEnum.USER;
    const valueObject = {
      value: 'mockValue',
    };
    service.setItem(key, valueObject);

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(valueObject)
    );
    expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should get item object by key', () => {
    const key = StorageKeysEnum.USER;
    const valueObject = {
      value: 'mockValue',
    };

    spyOn(window.sessionStorage, 'getItem').and.returnValue(
      JSON.stringify(valueObject)
    );

    service.setItem(key, valueObject);

    const result = service.getItem(key);

    expect(result).toEqual(valueObject);
  });

  it('should get item string by key', () => {
    const key = StorageKeysEnum.USER;
    const value = 'mockValue';

    spyOn(window.sessionStorage, 'getItem').and.returnValue(value);

    service.setItem(key, value);

    const result = service.getItem(key);

    expect(result).toEqual(value);
  });
});
