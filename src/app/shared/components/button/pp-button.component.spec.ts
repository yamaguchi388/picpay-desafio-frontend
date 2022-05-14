import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { PpButtonComponent } from "./pp-button.component";

const label = "Picpay";
@Component({
  template: `<pp-button><span>${label}</span></pp-button>`,
})
export class WrapperComponent {}

fdescribe("PpButtonComponent", () => {
  let component: PpButtonComponent;
  let fixture: ComponentFixture<PpButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpButtonComponent, WrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should apply primary variation correctly", () => {
    component.variant = "primary";
    fixture.detectChanges();

    const buttonEl$ = fixture.debugElement.query(By.css("button"));

    expect((buttonEl$.nativeElement as HTMLButtonElement).classList).toContain(
      "primary"
    );
  });

  it("should apply secondary variation correctly", () => {
    component.variant = "secondary";
    fixture.detectChanges();

    const buttonEl$ = fixture.debugElement.query(By.css("button"));

    expect((buttonEl$.nativeElement as HTMLButtonElement).classList).toContain(
      "secondary"
    );
  });

  it("should apply xs style correctly", () => {
    component.size = "xs";
    fixture.detectChanges();

    const buttonEl$ = fixture.debugElement.query(By.css("button"));

    expect((buttonEl$.nativeElement as HTMLButtonElement).classList).toContain(
      "xs"
    );
  });

  it("should apply sm border radius", () => {
    component.radiusSize = "sm";
    fixture.detectChanges();

    const buttonEl$ = fixture.debugElement.query(By.css("button"));

    expect((buttonEl$.nativeElement as HTMLButtonElement).classList).toContain(
      "border-radius-sm"
    );
  });

  it("should apply md border radius", () => {
    component.radiusSize = "md";
    fixture.detectChanges();

    const buttonEl$ = fixture.debugElement.query(By.css("button"));

    expect((buttonEl$.nativeElement as HTMLButtonElement).classList).toContain(
      "border-radius-md"
    );
  });

  it("should render ng-content", () => {
    const wrapperFixture = TestBed.createComponent(WrapperComponent);

    wrapperFixture.detectChanges();
    const span$ = wrapperFixture.debugElement.query(By.css("span"));

    expect((span$.nativeElement as HTMLSpanElement).textContent).toContain(
      label
    );
  });
});
