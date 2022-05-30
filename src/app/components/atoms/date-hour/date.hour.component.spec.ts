import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DateHourComponent } from "./date.hour.component";

describe("DateComponent", () => {
  let component: DateHourComponent;
  let fixture: ComponentFixture<DateHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateHourComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
