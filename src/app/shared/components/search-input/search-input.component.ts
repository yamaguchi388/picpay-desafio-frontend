import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() placeholder: string;
  @Input() searchCallbackLoading = false;
  @Input() handleSearch: (value: string) => void;

  onChangeDelay = 1000;
  value: string;
  delayDebounceFn = null;

  constructor() { }

  ngOnInit(): void {
  }

  onChange = () => {
    clearTimeout(this.delayDebounceFn);
    this.delayDebounceFn = setTimeout(() => {
      this.handleSearch(this.value);
    }, this.onChangeDelay);
  }

}
