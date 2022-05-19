import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, Account } from './../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  visibility!: boolean;
  profile!: Account;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.profile = history.state[0];
    if (!this.profile)
      this.router.navigate(['/login']);
    this.form = this.formBuilder.group({
      email: [this.profile?.email ?? '', [Validators.required, Validators.email, Validators.minLength(1)]],
      password: [this.profile?.password ?? '', [Validators.required, Validators.minLength(1)]],
      name: [this.profile?.name ?? '', [Validators.required, Validators.minLength(1)]],
      passwordConfirm: [this.profile?.password ?? '', [Validators.required, Validators.minLength(1)]]
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const user: Account = {
        ...this.form.value,
        id: this.profile.id
      }

      this.authService.update(user)
        .subscribe((user: Account) => {
          this.router.navigateByUrl('/payment', { state: [user] });
        },
          error => {
            console.error('Error', error)
          })
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/payment', { state: [this.profile] });
  }

}
