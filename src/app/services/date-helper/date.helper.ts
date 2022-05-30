import { Injectable } from "@angular/core";

@Injectable()
export class DateHelper {
  /**
   * Necessary to integrate with ng2-date-picker
   */
  convert(date: string): Date {
    const day = date.substring(0, 2);
    const month = date.substring(3, 5);
    const year = date.substring(6, 10);
    const hour = date.substring(11, 13);
    const minute = date.substring(14, 16);

    return new Date(`${month}-${day}-${year} ${hour}:${minute}`);
  }

  /**
   * Necessary to integrate with ng2-date-picker
   */
  convertISO(date: Date) {
    const year = String(date).substring(0, 4);
    const month = String(date).substring(5, 7);
    const day = String(date).substring(8, 10);
    let hour = String(date).substring(11, 13);

    if (Number(hour) - 3 < 0) {
      if (hour == "02") hour = "23";
      if (hour == "01") hour = "22";
      if (hour == "00") hour = "21";
    }

    const minute = String(date).substring(14, 16);

    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
}
