import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPaymentsComponent } from './no-payments.component';

describe('NoPaymentsComponent', () => {
  let component: NoPaymentsComponent;
  let fixture: ComponentFixture<NoPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
