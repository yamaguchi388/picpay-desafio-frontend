import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentsComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    
  }

}
