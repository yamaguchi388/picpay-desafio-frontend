import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-payments',
  templateUrl: './new-payments.component.html',
  styleUrls: ['./new-payments.component.scss']
})
export class NewPaymentsComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      title: new FormControl(''),
      value: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      isPayed: new FormControl('', [Validators.required]),
    });
  }

}
