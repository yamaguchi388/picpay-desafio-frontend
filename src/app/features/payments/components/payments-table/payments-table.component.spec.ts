import { APP_BASE_HREF } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { commonMock } from "@app/utils/test/mocks";
import { Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { paymentInitialState } from "../../ngrx/payments.reducer";
import { PaymentsModule } from "../../payments.module";

import { PaymentsTableComponent } from "./payments-table.component";

describe("PaymentsTableComponent", () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...commonMock,
        ReactiveFormsModule,
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
    const mockStore = TestBed.inject(Store);
    const mockStoreDispachSpy = jest.spyOn(mockStore, "dispatch");
    component.search();
    expect(mockStoreDispachSpy).toHaveBeenCalled();
  });

  it("should search when formGroup value change", (done) => {
    const searchSpy = jest.spyOn(component, "search");
    component.formGroup.controls["isPayed_like"].setValue("true");
    setTimeout(() => {
      expect(searchSpy).toHaveBeenCalled();
      done();
    }, 1000);
  });
});
