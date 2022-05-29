import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let paginator: MatPaginator
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ],
      imports:[MatPaginatorModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.length = 200;
    component.pageSize = 10;
    component.pageIndex = 1;
    paginator = fixture.nativeElement.querySelector('mat-paginator');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
