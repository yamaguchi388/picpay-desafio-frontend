import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "pp-error-message",
  templateUrl: "./pp-error-message.component.html"
})
export class PpErrorMessageComponent implements OnInit {
  @Input() errors: Array<string>;

  constructor() {}

  ngOnInit(): void {}
}
