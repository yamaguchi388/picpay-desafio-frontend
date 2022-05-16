import { AddInsertPaymentsComponent } from './add-insert-payments.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AddInsertPaymentsComponent', () => {
  let component: AddInsertPaymentsComponent;
  let fixture: ComponentFixture<AddInsertPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsertPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsertPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
