import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AuthModule } from "@app/core/auth/auth.module";
import { LoginComponent } from "./login.component";
import { provideMockStore } from "@ngrx/store/testing";
import { authInitialState } from "@app/core/auth/ngrx/auth.reducer";
import { commonMock } from "@app/utils/test/mocks";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AuthModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        ...commonMock,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        provideMockStore({
          initialState: {
            auth: authInitialState,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a email and password fields", () => {
    let email =
      fixture.debugElement.nativeElement.querySelector("#email_field");
    let password =
      fixture.debugElement.nativeElement.querySelector("#password_field");
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it("should have a clickable button", () => {
    const loginSpy = jest.spyOn(component, "login");
    let button = fixture.debugElement.nativeElement.querySelector(".main-btn");
    button.click();
    expect(loginSpy).toHaveBeenCalled();
  });

  it("should formGroup validate", () => {
    const formSpy = jest.spyOn(component.formGroup, "markAllAsTouched");
    let button = fixture.debugElement.nativeElement.querySelector(".main-btn");
    button.click();
    expect(formSpy).toHaveBeenCalled();
  });
});
