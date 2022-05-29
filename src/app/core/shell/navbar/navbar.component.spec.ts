/* eslint-disable no-undef */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthComponent } from '../../auth/auth.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar.component';
import { ROUTES } from 'src/app/shared/consts/routes';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, AuthComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: ROUTES.AUTH, component: AuthComponent }
        ]),
        MatMenuModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
