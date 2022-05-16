import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { MyPaymentsComponent } from "./my-payments.component";
import { PaymentService } from "./services/payment.service";
import { ToastrService } from "ngx-toastr";

const PaymentServiceMock = jasmine.createSpyObj("PaymentService", {
  getPayments: of([]),
  createPayment: of(),
  editPayment: of(),
  deletePayment: of(),
});

const ToastrServiceMock = jasmine.createSpyObj("ToastrService", {
  success: () => {},
});

describe("MyPaymentsComponent", () => {
  let component: MyPaymentsComponent;
  let fixture: ComponentFixture<MyPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPaymentsComponent],
      providers: [
        { provide: PaymentService, useValue: PaymentServiceMock },
        { provide: ToastrService, useValue: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
