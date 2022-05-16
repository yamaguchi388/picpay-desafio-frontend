import { LoginService } from "@/app/features/login/services/login.service";
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "pp-navbar",
  templateUrl: "./pp-navbar.component.html",
  styleUrls: ["./pp-navbar.component.scss"],
})
export class PpNavbarComponent implements OnInit, OnDestroy {
  @ViewChild("dropdownMenu") dropdownMenu: ElementRef<HTMLDivElement>;
  isOpenMenu = false;
  constructor(private route: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    document.addEventListener("click", this.handleClick.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener("click", this.handleClick.bind(this));
  }

  handleClick(event: PointerEvent) {
    if (this.dropdownMenu && this.isOpenMenu) {
      const path = event.composedPath();
      if (!path.some((el) => el === this.dropdownMenu.nativeElement)) {
        this.togglenMenu();
      }
    }
  }

  onClick(event: PointerEvent) {
    event.stopPropagation();
    this.togglenMenu();
  }

  togglenMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  logout() {
    this.loginService.logout();
    this.route.navigate(["/login"]);
  }
}
