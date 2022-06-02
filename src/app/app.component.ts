import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./core/auth/auth.service";
import { authActions } from "./core/auth/ngrx/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private ser: AuthService, private store: Store) {}

  ngOnInit() {
    this.title = "Desafio Picpay Front-end";
    this.store.dispatch(authActions.login({ email: "usuario@gmail.com", password: "usuario" }))
  }
}
