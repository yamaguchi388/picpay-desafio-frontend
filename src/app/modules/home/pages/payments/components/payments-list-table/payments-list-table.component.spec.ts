import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PaymentsListTableComponent } from "./payments-list-table.component";

describe("PaymentsListTableComponent", () => {
  let component: PaymentsListTableComponent;
  let fixture: ComponentFixture<PaymentsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsListTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
