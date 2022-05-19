import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService, SessionService } from 'src/app/core/core.index';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  const SessionServiceSpy = jasmine.createSpyObj<SessionService>(['getEmail', 'getUsuario']);
  SessionServiceSpy.getEmail.and.returnValue('usuario@gmail.com');
  SessionServiceSpy.getUsuario.and.returnValue('usuario');

  const LoginServiceSpy = jasmine.createSpyObj<LoginService>(['logout']); 
  LoginServiceSpy.logout.and.callThrough();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: SessionService,
          useValue: SessionServiceSpy
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Dever criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Dever deslogar da aplicação', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.logout();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
