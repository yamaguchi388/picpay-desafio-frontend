import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
    selector: 'button-atom',
    templateUrl: 'button.component.html',
    styleUrls: ['./button.component.scss']
  })
  export class Button implements OnInit {
    @Input() name: string;
    ngOnInit(): void {
        
    }
  }

