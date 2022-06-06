import { APP_BASE_HREF } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { provideMockStore } from "@ngrx/store/testing";
import { commonMock } from "@app/utils/test/mocks";
import { paymentInitialState } from "../../ngrx/payments.reducer";
import { PaymentsModule } from "../../payments.module";

import { PaymentCreateEditComponent } from "./payment-create-edit.component";

describe("PaymentCreateEditComponent", () => {
  let component: PaymentCreateEditComponent;
  let fixture: ComponentFixture<PaymentCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonMock, PaymentsModule],
      declarations: [PaymentCreateEditComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        provideMockStore({
          initialState: {
            payments: paymentInitialState,
          },
        }),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
