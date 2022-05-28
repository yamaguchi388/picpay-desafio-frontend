import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthCredentials } from 'src/app/shared/models';
import * as fromActions from '../../store/actions';
import * as fromSelectors from '../../store/selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loading$ = this.store.pipe(select(fromSelectors.getSignInLoading));
  constructor(private store: Store) {}

  ngOnInit(): void {}

  doLogin(credentials: AuthCredentials) {
    this.store.dispatch(fromActions.signIn({ payload: credentials }));
  }
}
