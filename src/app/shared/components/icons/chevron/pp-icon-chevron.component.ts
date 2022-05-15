import { Component, Input } from "@angular/core";

type ChevronDirections = "up" | "left" | "right" | "down";

@Component({
  selector: "pp-icon-chevron",
  templateUrl: "./pp-icon-chevron.component.html",
})
export class PpIconChevronComponent {
  @Input() direction: ChevronDirections = "left";
  @Input() width: number = 24;
  @Input() height: number = 24;

  getTransformStyleByDirection() {
    const styles = {
      up: 180,
      left: 90,
      right: 270,
      down: 0,
    };
    const rotation = styles[this.direction];
    return `transform: rotate(${rotation}deg)`;
  }
}
