import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthService } from "./core/auth/auth.service";
import { authActions } from "./core/auth/ngrx/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title: string;

  constructor() {}

  ngOnInit() {
    this.title = "Desafio Picpay Front-end";
  }
}
