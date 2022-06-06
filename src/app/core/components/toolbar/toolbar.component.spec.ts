import { APP_BASE_HREF } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { authActions } from "@app/core/auth/ngrx/auth.actions";
import { authInitialState } from "@app/core/auth/ngrx/auth.reducer";
import { CoreModule } from "@app/core/core.module";
import { paymentInitialState } from "@app/features/payments/ngrx/payments.reducer";
import { PaymentsModule } from "@app/features/payments/payments.module";
import { User } from "@app/models/user";
import { commonMock } from "@app/utils/test/mocks";
import { Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";

import { ToolbarComponent } from "./toolbar.component";

describe("ToolbarComponent", () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonMock, PaymentsModule],
      declarations: [ToolbarComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        provideMockStore({
          initialState: {
            auth: authInitialState,
            payments: paymentInitialState,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch action to list", () => {
    const mockStore = TestBed.inject(Store);
    const mockStoreDispachSpy = jest.spyOn(mockStore, "dispatch");
    component.logout();
    expect(mockStoreDispachSpy).toHaveBeenCalled();
  });
});
