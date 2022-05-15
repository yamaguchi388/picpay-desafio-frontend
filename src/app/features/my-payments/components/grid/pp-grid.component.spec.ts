import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpGridComponent } from './pp-grid.component';

describe('PpGridComponent', () => {
  let component: PpGridComponent;
  let fixture: ComponentFixture<PpGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
