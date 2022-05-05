import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'input-filter-atom',
    templateUrl: 'input-filter.component.html',
    styleUrls: ['./input-filter.component.scss']
  })
  export class InputFilter implements OnInit {
    @Input() placeholder: string;
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

