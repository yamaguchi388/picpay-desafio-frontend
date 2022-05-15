import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormError } from "src/app/shared/lib/formError/FormError";
import { IPayment } from "../../interfaces";

@Component({
  selector: "app-new-payment-dialog",
  templateUrl: "./new-payment-dialog.component.html",
  styleUrls: ["./new-payment-dialog.component.scss"],
})
export class NewPaymentDialogComponent implements OnInit {
  form: FormGroup;

  @Output()
  addNewData = new EventEmitter<IPayment>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NewPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IPayment
  ) {}

  get formIsInvalid() {
    return this.form.invalid;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      date: ["", Validators.required],
      username: ["", Validators.required],
      title: ["", Validators.required],
      value: ["", [Validators.required, Validators.min(1)]],
    });
  }

  verifyFormControlIsInvalid(key: string) {
    return FormError.verifyFormControlIsInvalid(this.form, key);
  }

  getFormControlError(key: string): string | void {
    return FormError.getFormControlError(this.form, key);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submitNewGroup() {
    if (this.formIsInvalid) return;

    const payload = {
      ...this.data,
      ...this.form.getRawValue(),
    };

    this.addNewData.emit(payload);
    this.dialogRef.close();
  }
}
