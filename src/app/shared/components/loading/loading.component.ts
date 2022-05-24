import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    private loadingStore: Store<{ loading: boolean }>
  ) { }

  ngOnInit(): void {
    this.getLoading();
  }

  getLoading(): void {
    this.loadingStore.pipe(select('loading')).subscribe(
      (loading: boolean) => {
        this.isLoading = loading;
      }
    )
  }

}
