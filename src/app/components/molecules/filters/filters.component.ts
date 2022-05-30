import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { filtersEnum } from "src/app/enums/filtersEnum";
import { ISearchFilters } from "src/app/interfaces/IFilters";
import { DateHelper } from "src/app/services/date-helper/date.helper";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  public searchFilters: ISearchFilters = {
    searchString: "",
    searchField: "username",
  };
  public placeholder: string = `Pesquisar por ${
    filtersEnum[this.searchFilters.searchField]
  }`;
  public selectFilterState: boolean;
  public stringSearch = true;
  public dateSearch = false;
  public booleanSearch = false;
  public invalid = !false;
  public checkboxModel: any;

  @Output() onSearch = new EventEmitter<ISearchFilters>();

  constructor(private dateHelper: DateHelper) {}

  ngOnInit(): void {}

  changeSearchField(searchField: string) {
    this.filtersOut();

    this.searchFilters.searchField = searchField;
    this.placeholder = `Pesquisar por ${
      filtersEnum[this.searchFilters.searchField]
    }`;

    this.changeInput();

    if (this.booleanSearch) {
      this.checkboxModel = false;
    } else {
      this.searchFilters.searchString = undefined;
    }

    this.submit();
  }

  submit() {
    if (this.booleanSearch) {
      this.searchFilters.searchString = String(!!this.checkboxModel);
    }

    this.onSearch.emit(this.searchFilters);
  }

  filtersToggle() {
    this.selectFilterState = !this.selectFilterState;
  }

  filtersOut() {
    this.selectFilterState = false;
  }

  getLabel() {
    return filtersEnum[this.searchFilters.searchField];
  }

  changeInput() {
    if (this.searchFilters.searchField == "date") {
      this.stringSearch = false;
      this.booleanSearch = false;
      this.dateSearch = true;
    } else if (this.searchFilters.searchField == "isPayed") {
      this.dateSearch = false;
      this.stringSearch = false;
      this.booleanSearch = true;
    } else {
      this.dateSearch = false;
      this.booleanSearch = false;
      this.stringSearch = true;
    }
  }

  submitDate(event: string) {
    if (!event) {
      this.searchFilters.searchString = "";
      this.submit();
      return;
    }

    let date: any = this.dateHelper.convert(event);
    date = date.toISOString().substring(0, 10);

    this.searchFilters.searchString = date;
    this.submit();
  }
}
