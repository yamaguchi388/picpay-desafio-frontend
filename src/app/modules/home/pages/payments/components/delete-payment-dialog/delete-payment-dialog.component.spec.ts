import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/modules/material/material.module";

import { DeletePaymentDialogComponent } from "./delete-payment-dialog.component";

describe("DeletePaymentDialogComponent", () => {
  let component: DeletePaymentDialogComponent;
  let fixture: ComponentFixture<DeletePaymentDialogComponent>;

  let dialogRef = { close: (param: any) => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      declarations: [DeletePaymentDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should close modal when user click cancelar button", () => {
    const cancelButton = fixture.debugElement.query(By.css("#cancel-btn"));

    spyOn(component.dialogRef, "close");

    cancelButton.nativeElement.click();

    fixture.detectChanges();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it("should close modal with true value when user click salvar button", () => {
    const confirmButton = fixture.debugElement.query(By.css("#confirm-btn"));

    spyOn(component.dialogRef, "close");

    confirmButton.nativeElement.click();

    fixture.detectChanges();

    expect(component.dialogRef.close).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });
});
