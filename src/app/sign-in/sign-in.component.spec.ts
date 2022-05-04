import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { SignInComponent } from './sign-in.component';
import { AppService } from '../app.service';
import { Account } from '../classes/Account';
import { routes } from '../app-routing.module';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes), 
        HttpClientTestingModule, ToastrModule.forRoot() 
      ],
      declarations: [ SignInComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to home when return a valid account from signIn", fakeAsync(() => {
    const account: Account = {
      "id": 0,
      "name": "usuario",
      "email": "usuario@gaamail.com",
      "password": "usuario"
    }

    const appService = fixture.debugElement.injector.get(AppService);
    const spy = spyOn(appService, 'getAccountByEmailAndPassword').and.returnValue(Promise.resolve(account));

    const router = fixture.debugElement.injector.get(Router);  

    component.signIn();

    fixture.detectChanges();
    tick();

    expect(appService.getAccountByEmailAndPassword).toHaveBeenCalled();
    expect(spy).not.toThrow();
    expect(router.url).toEqual('/home');
  }));

});
