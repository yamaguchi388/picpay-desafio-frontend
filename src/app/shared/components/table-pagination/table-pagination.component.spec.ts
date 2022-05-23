import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';

import { TablePaginationComponent } from './table-pagination.component';

describe('TablePaginationComponent', () => {
  let component: TablePaginationComponent;
  let fixture: ComponentFixture<TablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ TablePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePaginationComponent);
    component = fixture.componentInstance;

    component.currentPage = 1;
    component.numberOfPages = 10;
    component.changePagination = (page) => component.currentPage = page;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current page', () => {
    const currentPage = component.getCurrentPage();

    expect(currentPage).toBeTruthy();
  });

  it('should click in left arrow and change the current page', () => {
    const currentPage = component.getCurrentPage();

    component.changePaginationLeft();

    fixture.detectChanges();

    const newPage = component.getCurrentPage();

    expect(currentPage).toBeGreaterThan(newPage);
  });

  it('should click in right arrow and change the current page', () => {
    const currentPage = component.getCurrentPage();

    component.changePaginationRight();

    fixture.detectChanges();

    const newPage = component.getCurrentPage();

    expect(currentPage).toBeLessThan(newPage);
  });
});
