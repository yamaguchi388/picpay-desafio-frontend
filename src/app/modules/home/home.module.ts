import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PoAvatarModule, PoMenuModule, PoPageModule, PoToolbarModule } from "@po-ui/ng-components";
import { LoginService, SessionService } from "src/app/core/core.index";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./pages/home.component";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        PoPageModule,
        PoToolbarModule,
        PoMenuModule,
        PoAvatarModule,
        SharedModule
    ],
    providers: [
        LoginService,
        SessionService
    ]
  })
  export class HomeModule { }