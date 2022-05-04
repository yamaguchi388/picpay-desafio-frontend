import { Component, Input, OnInit } from "@angular/core";
import { IUser } from "src/app/shared/interfaces";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user!: IUser;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  private getLoggedUser() {
    this.user = this.userService.getLoggedUser();
  }
}
