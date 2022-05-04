import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { MaterialModule } from "src/app/shared/modules/material/material.module";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UserService } from "src/app/shared/services/user/user.service";
import { SignInFormComponent } from "./shared/components/sign-in-form/sign-in-form.component";
import { SignInComponent } from "./sign-in.component";

describe("SignInComponent", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let toastrService: ToastrService;
  let router: Router;
  let httpClient: HttpClient;
  let userService: UserService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MaterialModule,
      ],
      declarations: [SignInComponent, SignInFormComponent],
      providers: [AuthService, HttpClient, UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    httpClient = TestBed.inject(HttpClient);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
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

  it("should call sign in method when user click on entrar button", () => {
    const mockUser = {
      id: 0,
      name: "Dummy user",
      email: "usuario@gmail.com",
    };
    spyOn(authService, "signIn").and.returnValue(of(mockUser));

    spyOn(toastrService, "success");
    spyOn(router, "navigate");
    spyOn(userService, "setUserOnSession");

    const emailInput = fixture.debugElement.query(By.css("#email"));
    emailInput.nativeElement.value = mockUser.email;
    emailInput.nativeElement.dispatchEvent(new Event("input"));

    const dummyPass = "secretPass";
    const passwordInput = fixture.debugElement.query(By.css("#password"));

    passwordInput.nativeElement.value = dummyPass;
    passwordInput.nativeElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    const signBtn = fixture.debugElement.query(By.css("#sign-in-btn"));
    signBtn.nativeElement.click();

    expect(authService.signIn).toHaveBeenCalledWith({
      email: mockUser.email,
      password: dummyPass,
    });

    expect(authService.signIn).toHaveBeenCalledTimes(1);
    expect(toastrService.success).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(userService.setUserOnSession).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledOnceWith(["/"]);
  });

  it("should show usuario não encontrado message when insert wrong valus on form", () => {
    const errorMessage = "Usuário não encontrado";
    spyOn(httpClient, "get").and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {
            status: HttpStatusCode.Unauthorized,
            errors: [errorMessage],
          },
        })
      )
    );

    spyOn(toastrService, "error");

    const dummyEmail = "dummy@email.com";
    const emailInput = fixture.debugElement.query(By.css("#email"));
    emailInput.nativeElement.value = dummyEmail;
    emailInput.nativeElement.dispatchEvent(new Event("input"));

    const dummyPass = "secretPass";
    const passwordInput = fixture.debugElement.query(By.css("#password"));
    passwordInput.nativeElement.value = dummyPass;
    passwordInput.nativeElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    const signBtn = fixture.debugElement.query(By.css("#sign-in-btn"));
    signBtn.nativeElement.click();

    fixture.detectChanges();

    expect(toastrService.error).toHaveBeenCalledTimes(1);
  });
});
