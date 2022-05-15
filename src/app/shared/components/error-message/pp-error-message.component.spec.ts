import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpErrorMessageComponent } from './pp-error-message.component';

describe('PpErrorMessageComponent', () => {
  let component: PpErrorMessageComponent;
  let fixture: ComponentFixture<PpErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
