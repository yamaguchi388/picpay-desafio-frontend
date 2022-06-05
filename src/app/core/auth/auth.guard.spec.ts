import { APP_BASE_HREF } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
