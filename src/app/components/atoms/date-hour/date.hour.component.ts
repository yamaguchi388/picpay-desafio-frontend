import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { DatePickerDirective, IDatePickerConfig } from "ng2-date-picker";
import { DatePickerDefault } from "src/app/constants/date.picker.default";

@Component({
  selector: "app-date-hour",
  templateUrl: "./date.hour.component.html",
  styleUrls: ["./date.hour.component.scss"],
})
export class DateHourComponent implements OnInit {
  public config: IDatePickerConfig = {
    ...DatePickerDefault,
  };
  @ViewChild("dateDirectivePicker") dpDayPicker: DatePickerDirective;
  @Input() public date: string;
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
}
