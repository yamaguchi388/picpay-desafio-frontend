import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { paymentInitialState, PaymentState } from "../../ngrx/payments.reducer";
import { PaymentsModule } from "../../payments.module";

import { PaymentsTableComponent } from "./payments-table.component";

describe("PaymentsTableComponent", () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;
  jest.setTimeout(10000);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        EffectsModule.forRoot([]),
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        HttpClientModule,
        NoopAnimationsModule,
        NzPaginationModule,
        MatTableModule,
        PaymentsModule,
      ],
      declarations: [PaymentsTableComponent],
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

  beforeEach(async () => {
    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    await fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a table component", () => {
    let table = fixture.debugElement.nativeElement.querySelector("table");
    expect(table).toBeTruthy();
  });

  it("should dispatch action to list", () => {
    const mockStore: MockStore<PaymentState> = TestBed.get(Store);
    const mockStoreDispachSpy = jest.spyOn(mockStore, "dispatch");
    component.search();
    expect(mockStoreDispachSpy).toHaveBeenCalled();
  });
});
