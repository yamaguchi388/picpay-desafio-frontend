import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LoginComponent } from "./login.component";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginService } from "./services/login.service";
import { PpButtonComponent } from "@/app/shared/components/button/pp-button.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@/app/shared/shared.module";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

const LoginServiceMock = jasmine.createSpyObj("LoginService", {
  authenticate: of().toPromise(),
  logout: of(),
});

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      declarations: [LoginComponent, PpButtonComponent],
      providers: [{ provide: LoginService, useValue: LoginServiceMock }],
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

  it("should display error message when type a invalid email", () => {
    const inputEmail = (
      fixture.debugElement.nativeElement as HTMLDivElement
    ).querySelector("#email") as HTMLInputElement;

    inputEmail.value = "usuario";
    inputEmail.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    const li = fixture.debugElement.query(By.css("li"));
    expect((li.nativeElement as HTMLLIElement).textContent).toContain("O email é inválido.")
  });

  it("should display required message when erasing email input value", () => {
    
    const inputEmail = (
      fixture.debugElement.nativeElement as HTMLDivElement
    ).querySelector("#email") as HTMLInputElement;

    inputEmail.value = "usuario@gmail.com";
    inputEmail.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    inputEmail.value = "";
    inputEmail.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    const li = fixture.debugElement.query(By.css("li"));
    expect((li.nativeElement as HTMLLIElement).textContent).toContain("O campo email é obrigatório.")
  });

  it("should display required message when erasing password input value", () => {
    
    const inputPassword = (
      fixture.debugElement.nativeElement as HTMLDivElement
    ).querySelector("#password") as HTMLInputElement;

    inputPassword.value = "usuario";
    inputPassword.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    inputPassword.value = "";
    inputPassword.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    const li = fixture.debugElement.query(By.css("li"));
    expect((li.nativeElement as HTMLLIElement).textContent).toContain("O campo senha é obrigatório.")
  });

});
