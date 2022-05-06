import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLoginViewComponent } from './welcome-login-view.component';

describe('WelcomeLoginViewComponent', () => {
  let component: WelcomeLoginViewComponent;
  let fixture: ComponentFixture<WelcomeLoginViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeLoginViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeLoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
