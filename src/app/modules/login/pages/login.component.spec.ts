import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoNotificationService } from '@po-ui/ng-components';
import { of, throwError } from 'rxjs';
import { LoginService } from 'src/app/core/core.index';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  const LoginServiceSpy = jasmine.createSpyObj<LoginService>(['login']); 
  const PoNotificationServiceSpy = jasmine.createSpyObj<PoNotificationService>(['error']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: PoNotificationService,
          useValue: PoNotificationServiceSpy
        },
        {
          provide: LoginService,
          useValue: LoginServiceSpy
        }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Dever criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Dever logar na plataforma e redirecionar para a home', () => {
    const navigateSpy = spyOn(router, 'navigate');
    LoginServiceSpy.login.and.returnValue(of(true));
    PoNotificationServiceSpy.error.and.returnValue(null);

    
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('Dever apresentar um erro ao entrar logar com login incorreto', () => {
    LoginServiceSpy.login.and.returnValue(of(false));
    PoNotificationServiceSpy.error.and.callThrough();
    
    component.onSubmit();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever apresentar um erro ao enviar a requisição', () => {
    LoginServiceSpy.login.and.returnValue(throwError(new Error));
    PoNotificationServiceSpy.error.and.callThrough();
    
    component.onSubmit();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });

  it('Dever apresentar um erro ao não preencher os dados', () => {
    component.form.controls['login'].setErrors({'incorrect': true});
    
    component.onSubmit();
    expect(PoNotificationServiceSpy.error).toHaveBeenCalled();
  });
});
