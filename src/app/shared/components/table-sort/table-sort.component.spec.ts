import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { TableSortComponent } from "./table-sort.component";

describe("TableSortComponent", () => {
  let component: TableSortComponent;
  let fixture: ComponentFixture<TableSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableSortComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit sort event when user click", () => {
    const sortBtn = fixture.debugElement.query(By.css("#sort-img"));

    spyOn(component.sortEvent, "emit");

    sortBtn.nativeElement.click();

    fixture.detectChanges();

    expect(component.sortEvent.emit).toHaveBeenCalled();
  });
});
