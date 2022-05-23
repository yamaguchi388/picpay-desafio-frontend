import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared.module';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  const router = { navigate: jasmine.createSpy('navigate') };

  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, SharedModule ],
      declarations: [ ToolbarComponent ],
      providers: [
        { provide: Router, useValue: router },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show profile menu when click in user photo', () => {
    component.onShowUserOptions();
    fixture.detectChanges();

    const logoutButton = fixture.nativeElement.querySelector('#menu-logout-btn');

    expect(logoutButton).toBeTruthy();
  });

  it('should can logout', () => {
    component.logout();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should can go to home page', () => {
    component.goToHome();

    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should can go to profile page', () => {
    component.goToProfilePage();

    expect(router.navigate).toHaveBeenCalledWith(['profile']);
  });
});
