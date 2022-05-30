import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "src/app/constants/routes";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("header") divHeader: ElementRef;
  public toggle: boolean;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  openMenu() {
    this.toggle = !this.toggle;

    if (this.toggle) {
      this.renderer.addClass(this.divHeader.nativeElement, "header-expanded");
    } else {
      this.renderer.removeClass(
        this.divHeader.nativeElement,
        "header-expanded"
      );
    }
  }

  dashboard() {
    this.router.navigate([Routes.dashboard]);
  }

  logout() {
    this.router.navigate([Routes.login]);
  }

  profile() {
    this.router.navigate([`${Routes.profile}/${this.authService.id}`]);
  }
}
