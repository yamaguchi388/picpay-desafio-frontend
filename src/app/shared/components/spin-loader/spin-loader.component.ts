import { Component, Input, OnInit } from '@angular/core';

type SpinerSize = 'small' | 'large';

@Component({
  selector: 'app-spin-loader',
  templateUrl: './spin-loader.component.html',
  styleUrls: ['./spin-loader.component.scss']
})
export class SpinLoaderComponent implements OnInit {

  @Input() size: SpinerSize = 'small';

  constructor() { }

  ngOnInit(): void {
  }

}
