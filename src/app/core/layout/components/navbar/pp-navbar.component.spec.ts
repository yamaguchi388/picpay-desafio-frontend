import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpNavbarComponent } from './pp-navbar.component';

describe('PpNavbarComponent', () => {
  let component: PpNavbarComponent;
  let fixture: ComponentFixture<PpNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
