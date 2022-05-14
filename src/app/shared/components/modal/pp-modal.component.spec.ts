import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpModalComponent } from './pp-modal.component';

describe('PpModalComponent', () => {
  let component: PpModalComponent;
  let fixture: ComponentFixture<PpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
