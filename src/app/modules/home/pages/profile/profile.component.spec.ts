import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { InputModule } from 'src/app/shared/components/form/input/input.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UserService } from 'src/app/shared/services/user/user.service';

import { ProfileComponent } from './profile.component';

const mockUser: any = {
  id: 1,
  name: 'Dummy user',
  email: 'email@email.com',
  password: '123',
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;
  let httpService: HttpService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        InputModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule,
      ],
      declarations: [ProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    spyOn(userService, 'getLoggedUser').and.returnValue(mockUser);

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    httpService = TestBed.inject(HttpService);
    toastrService = TestBed.inject(ToastrService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable salvar button when user remove required value the form', () => {
    const button = fixture.nativeElement.querySelector(
      'button[id=\'submit-button\']'
    );

    expect(button.disabled).toBeFalsy();

    const nameInput = fixture.nativeElement.querySelector('input[id=\'name\']');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(button.disabled).toBeTruthy();
  });

  it('should update user data when user change value and click on salvar button', () => {
    const nameUpdated = 'Dummy name change';

    spyOn(httpService, 'put').and.callFake(() =>
      of({
        ...mockUser,
        name: nameUpdated,
      })
    );

    spyOn(toastrService, 'success');

    const button = fixture.nativeElement.querySelector(
      'button[id=\'submit-button\']'
    );

    const nameFormControl = component.form.get('name');
    expect(nameFormControl.value).toEqual(mockUser.name);

    const nameInput = fixture.nativeElement.querySelector('input[id=\'name\']');
    nameInput.value = nameUpdated;
    nameInput.dispatchEvent(new Event('input'));

    button.click();

    fixture.detectChanges();

    expect(httpService.put).toHaveBeenCalledTimes(1);
    expect(toastrService.success).toHaveBeenCalledTimes(1);
  });

  it('should reset form when user click on reset button', () => {
    const nameUpdated = 'Dummy name change';

    const nameFormControl = component.form.get('name');
    expect(nameFormControl.value).toEqual(mockUser.name);

    const nameInput = fixture.nativeElement.querySelector('input[id=\'name\']');
    nameInput.value = nameUpdated;
    nameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(nameFormControl.value).toEqual(nameUpdated);

    const button = fixture.nativeElement.querySelector(
      'button[id=\'reset-button\']'
    );

    button.click();

    fixture.detectChanges();

    expect(nameFormControl.value).toEqual(mockUser.name);
  });

  it('should set form invalid when user not type same password on passord field and confirm password field', () => {
    const button = fixture.nativeElement.querySelector(
      'button[id=\'submit-button\']'
    );

    expect(button.disabled).toBeFalsy();

    const passwordControl = component.form.get('password');
    const confirmPasswordControl = component.form.get('confirmPassword');

    expect(passwordControl.value).toEqual(confirmPasswordControl.value);

    const passwordInput = fixture.nativeElement.querySelector(
      'input[id=\'password\']'
    );
    passwordInput.value = 'changePassword';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();
    expect(button.disabled).toBeTruthy();
  });
});
