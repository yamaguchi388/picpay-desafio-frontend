import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PoButtonModule, PoFieldModule } from "@po-ui/ng-components";
import { LoginService } from "src/app/core/services/login/login.service";
import { SessionService } from "src/app/core/services/session/session.service";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./pages/login.component";

@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      CommonModule,
      PoFieldModule,
      PoButtonModule,
      FormsModule,
      ReactiveFormsModule,
      LoginRoutingModule
    ],
    providers: [
      LoginService,
      SessionService
    ]
  })
  export class LoginModule { }