import { Component, Input, OnInit } from '@angular/core';

type btnVariant = 'primary' | 'secondary' | 'transparent';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonId? = '';
  @Input() ariaLabel? = '';
  @Input() type = 'submit';
  @Input() handleClick = null;
  @Input() disabled = false;
  @Input() small = false;
  @Input() variant: btnVariant = 'primary';

  constructor() { }

  ngOnInit(): void { }

}
