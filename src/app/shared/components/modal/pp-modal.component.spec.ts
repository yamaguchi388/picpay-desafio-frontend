import { Component } from "@angular/core";
import { ComponentFixture, TestBed, } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { PpModalComponent } from "./pp-modal.component";



fdescribe("PpModalComponent", () => {
  let component: PpModalComponent;
  let fixture: ComponentFixture<PpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render title", () => {
    const title = "title";
    component.title = title;
    fixture.detectChanges();
    const h2 = fixture.debugElement.query(By.css("h2"));

    expect((h2.nativeElement as HTMLHeadingElement).textContent).toBe(title);
  });

  it("should open modal when toggle is triggered", () => {
    component.toggle();
    fixture.detectChanges();
    const modalOverlay = fixture.debugElement.query(By.css(".overlay"));
    const modal = modalOverlay.query(By.css(".modal"));
    expect((modalOverlay.nativeElement as HTMLDivElement).classList).toContain("d-block");
    expect(modal).toBeTruthy();
  });

  it("should close modal when toggle is triggered for the second time", () => {
    component.toggle();
    fixture.detectChanges();
    component.toggle();
    fixture.detectChanges();
    const modalOverlay = fixture.debugElement.query(By.css(".overlay"));
    expect((modalOverlay.nativeElement as HTMLDivElement).classList).toContain("d-none");
  });
});
