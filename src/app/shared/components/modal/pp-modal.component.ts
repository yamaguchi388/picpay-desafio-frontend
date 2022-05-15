import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "pp-modal",
  templateUrl: "./pp-modal.component.html",
  styleUrls: ["./pp-modal.component.scss"],
})
export class PpModalComponent implements OnInit {
  @Input() title: string;
  @Input() width = "auto";
  @ViewChild("modal") modalDiv: ElementRef<HTMLDivElement>;
  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  onClickOverlay(event: PointerEvent) {
    const path = event.composedPath();
    if (
      !path.some((el) => (el as HTMLElement) === this.modalDiv.nativeElement)
    ) {
      this.toggle();
    }
  }
}
