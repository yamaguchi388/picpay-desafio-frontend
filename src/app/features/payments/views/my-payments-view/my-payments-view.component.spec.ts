import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaymentsViewComponent } from './my-payments-view.component';

describe('MyPaymentsViewComponent', () => {
  let component: MyPaymentsViewComponent;
  let fixture: ComponentFixture<MyPaymentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPaymentsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPaymentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
