import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/modules/material/material.module";

import { SignInFormComponent } from "./sign-in-form.component";

describe("SignInFormComponent", () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [SignInFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should enable entrar button when user insert email and password on form", () => {
    const signBtn = fixture.debugElement.query(By.css("#sign-in-btn"));
    expect(signBtn.nativeElement.disabled).toBeTrue();

    const emailInput = fixture.debugElement.query(By.css("#email"));
    emailInput.nativeElement.value = "dummy@email.com";
    emailInput.nativeElement.dispatchEvent(new Event("input"));

    const passwordInput = fixture.debugElement.query(By.css("#password"));
    passwordInput.nativeElement.value = "secretPass";
    passwordInput.nativeElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    expect(signBtn.nativeElement.disabled).toBeFalse();
  });

  it("should validate form when user insert wrong email on form", () => {
    spyOn(component, "getFormControlError");

    const emailInput = fixture.debugElement.query(By.css("#email"));
    emailInput.nativeElement.value = "dummyWrongEmail.";
    emailInput.nativeElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    expect(component.form.get("email").invalid).toBeTruthy();
    expect(component.getFormControlError).toHaveBeenCalled();
  });

  it("should call submitEvent emit method when user click on entrar button", () => {
    const mockCredentials = {
      email: "usuario@gmail.com",
      password: "dummyPass",
    };

    spyOn(component.submitEvent, "emit");

    const emailInput = fixture.debugElement.query(By.css("#email"));
    emailInput.nativeElement.value = mockCredentials.email;
    emailInput.nativeElement.dispatchEvent(new Event("input"));

    const passwordInput = fixture.debugElement.query(By.css("#password"));

    passwordInput.nativeElement.value = mockCredentials.password;
    passwordInput.nativeElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    const signBtn = fixture.debugElement.query(By.css("#sign-in-btn"));
    signBtn.nativeElement.click();

    expect(component.submitEvent.emit).toHaveBeenCalledTimes(1);
    expect(component.submitEvent.emit).toHaveBeenCalledWith(mockCredentials);
  });
});
