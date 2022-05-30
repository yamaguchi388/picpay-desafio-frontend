import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IncludeDialogComponent } from "./include-dialog.component";

describe("IncludeDialogComponent", () => {
  let component: IncludeDialogComponent;
  let fixture: ComponentFixture<IncludeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncludeDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
