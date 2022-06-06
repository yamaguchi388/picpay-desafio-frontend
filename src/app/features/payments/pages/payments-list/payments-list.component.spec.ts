import { APP_BASE_HREF } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { commonMock } from "@app/utils/test/mocks";
import { provideMockStore } from "@ngrx/store/testing";
import { paymentInitialState } from "../../ngrx/payments.reducer";
import { PaymentsModule } from "../../payments.module";
import { PaymentsListComponent } from "./payments-list.component";

describe("PaymentsListComponent", () => {
  let component: PaymentsListComponent;
  let fixture: ComponentFixture<PaymentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonMock, PaymentsModule],
      declarations: [PaymentsListComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        provideMockStore({
          initialState: {
            payments: paymentInitialState,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
