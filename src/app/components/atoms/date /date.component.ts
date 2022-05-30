import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { DatePickerDirective, IDatePickerConfig } from "ng2-date-picker";
import { DatePickerDefault } from "src/app/constants/date.picker.default";

@Component({
  selector: "app-date",
  templateUrl: "./date.component.html",
  styleUrls: ["./date.component.scss"],
})
export class DateComponent implements OnInit {
  public date: string;
  public config: IDatePickerConfig = {
    ...DatePickerDefault,
    format: "DD/MM/YYYY",
  };
  @ViewChild("dateDirectivePicker") dpDayPicker: DatePickerDirective;
  @Input() invalid: boolean;
  @Output() onChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  emitChanges(event: any) {
    this.onChange.emit(event);
  }

  openDatePicker() {
    this.dpDayPicker.api.open();
  }

  clear() {
    this.date = undefined;

    this.emitChanges(this.date);
  }
}
