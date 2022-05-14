import { Component, Input, OnInit } from "@angular/core";

type Variant = "primary" | "secondary";
type VariantRadius = "sm" | "md";
type ButtonSize = "xs" | "sm" | "md";

@Component({
  selector: "pp-button",
  templateUrl: "./pp-button.component.html",
  styleUrls: ["./pp-button.component.scss"],
})
export class PpButtonComponent {
  @Input() variant: Variant = "primary";
  @Input() size: ButtonSize = "md";
  @Input("radius-size") radiusSize: VariantRadius = "sm";

  constructor() {}

}
