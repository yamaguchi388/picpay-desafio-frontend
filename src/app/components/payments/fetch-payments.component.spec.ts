import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchPaymentsComponent } from './fetch-payments.component';

describe('FetchPaymentsComponent', () => {
  let component: FetchPaymentsComponent;
  let fixture: ComponentFixture<FetchPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
