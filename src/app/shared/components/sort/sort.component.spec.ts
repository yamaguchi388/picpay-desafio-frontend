import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SortComponent } from './sort.component';

describe('TableSortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort event when user click', () => {
    const sortBtn = fixture.debugElement.query(By.css('#sort-img'));

    spyOn(component.sortEvent, 'emit');

    sortBtn.nativeElement.click();

    fixture.detectChanges();

    expect(component.sortEvent.emit).toHaveBeenCalled();
  });
});