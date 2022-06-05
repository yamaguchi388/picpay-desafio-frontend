import { Component, OnInit } from "@angular/core";
import { authActions } from "@app/core/auth/ngrx/auth.actions";
import { selectUser } from "@app/core/auth/ngrx/auth.selector";
import { User } from "@app/models/user";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store) {
    // this.store.dispatch(authActions.login({email: 'sandro@gmail.com', password: '123'})) only development purpose
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {}
}
