import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputModule } from 'src/app/shared/components/form/input/input.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

import { NewPaymentDialogComponent } from './new-payment-dialog.component';

describe('NewPaymentDialogComponent', () => {
  let component: NewPaymentDialogComponent;
  let fixture: ComponentFixture<NewPaymentDialogComponent>;

  const matDialogMockRef = {
    close: (payload: any) => {},
  };

  const matDialogData = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        InputModule,
        NoopAnimationsModule,
      ],
      declarations: [NewPaymentDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogMockRef },
        { provide: MAT_DIALOG_DATA, useValue: matDialogData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable button form when user type payment form', () => {
    const submitBtn = fixture.debugElement.query(By.css('#submit-btn'));
    expect(submitBtn.nativeElement.disabled).toBeTrue();

    const nameInput = fixture.nativeElement.querySelector('input[id=\'name\']');
    nameInput.value = 'Bruce Martyn';
    nameInput.dispatchEvent(new Event('input'));

    const usernameInput = fixture.nativeElement.querySelector(
      'input[id=\'username\']'
    );
    usernameInput.value = 'bmartyni';
    usernameInput.dispatchEvent(new Event('input'));

    const valueInput = fixture.nativeElement.querySelector('input[id=\'value\']');
    valueInput.value = 201.28;
    valueInput.dispatchEvent(new Event('input'));

    const dateInput = fixture.nativeElement.querySelector('input[id=\'date\']');
    dateInput.value = '2021-02-15T18:14:35';
    dateInput.dispatchEvent(new Event('input'));

    const titleInput = fixture.nativeElement.querySelector('input[id=\'title\']');
    titleInput.value = 'Structural Analysis Engineer';
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(submitBtn.nativeElement.disabled).toBeFalse();
  });

  it('should submit new payment when user click on salvar button', () => {
    spyOn(component.dialogRef, 'close');

    const nameInput = fixture.nativeElement.querySelector('input[id=\'name\']');
    nameInput.value = 'Bruce Martyn';
    nameInput.dispatchEvent(new Event('input'));

    const usernameInput = fixture.nativeElement.querySelector(
      'input[id=\'username\']'
    );
    usernameInput.value = 'bmartyni';
    usernameInput.dispatchEvent(new Event('input'));

    const valueInput = fixture.nativeElement.querySelector('input[id=\'value\']');
    valueInput.value = 201.28;
    valueInput.dispatchEvent(new Event('input'));

    const dateInput = fixture.nativeElement.querySelector('input[id=\'date\']');
    dateInput.value = '2021-02-15T18:14:35';
    dateInput.dispatchEvent(new Event('input'));

    const titleInput = fixture.nativeElement.querySelector('input[id=\'title\']');
    titleInput.value = 'Structural Analysis Engineer';
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const submitBtn = fixture.debugElement.query(By.css('#submit-btn'));
    submitBtn.nativeElement.click();

    fixture.detectChanges();

    expect(matDialogMockRef.close).toHaveBeenCalled();
    expect(matDialogMockRef.close).toHaveBeenCalledWith(
      component.form.getRawValue()
    );
  });

  it('should close modal when user click cancelar button', () => {
    const cancelButton = fixture.debugElement.query(By.css('#cancel-btn'));

    spyOn(component.dialogRef, 'close');

    cancelButton.nativeElement.click();

    fixture.detectChanges();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
