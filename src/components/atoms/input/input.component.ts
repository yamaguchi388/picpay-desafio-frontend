import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'input-atom',
    templateUrl: 'input.component.html',
    styleUrls: ['./input.component.scss']
  })
  export class InputFilter implements OnInit {
    @Input() name: string;
    @Input() placeholder: string;
    @Input() type: string;
    @Output() inputValuesChildren = new EventEmitter();

    filterParams = {
        param: '',
        value: ''
      }

    ngOnInit(): void {
        
    }
  
    handleInputName(event){
        this.filterParams.param = 'name';
        this.filterParams.value = event.target.value;
        this.inputValuesChildren.emit(this.filterParams);
    }


  }

