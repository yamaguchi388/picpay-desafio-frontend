import { FormControl, FormGroup, Validators } from "@angular/forms";

export function loginFormGroup() {
  const formGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  return formGroup;
}
