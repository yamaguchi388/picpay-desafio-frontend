import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiltersComponent } from "./filters.component";
import { FormsModule } from "@angular/forms";
import { DateModule } from "../../atoms/date /date.module";
import { DateHelper } from "src/app/services/date-helper/date.helper";

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, FormsModule, DateModule],
  exports: [FiltersComponent],
  providers: [DateHelper],
})
export class FiltersModule {}
