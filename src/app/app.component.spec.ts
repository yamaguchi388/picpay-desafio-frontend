import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
        HttpClientModule,
        CoreModule,
      ],
      declarations: [AppComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
