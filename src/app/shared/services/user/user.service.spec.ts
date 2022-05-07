import { TestBed } from "@angular/core/testing";
import { StorageKeysEnum } from "../../enums";
import { IUser } from "../../interfaces";
import { StorageService } from "../storage/storage.service";

import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    storageService = TestBed.inject(StorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should storage user on service", () => {
    const user: IUser = {
      id: 0,
      name: "dummy email",
      email: "email@email.com",
      password: "secret",
    };

    spyOn(storageService, "setItem");

    service.setUserOnSession(user);

    expect(storageService.setItem).toHaveBeenCalledTimes(1);
    expect(storageService.setItem).toHaveBeenCalledWith(
      StorageKeysEnum.USER,
      user
    );
  });
});
