import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpPaginationComponent } from './pp-pagination.component';

describe('PpPaginationComponent', () => {
  let component: PpPaginationComponent;
  let fixture: ComponentFixture<PpPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
