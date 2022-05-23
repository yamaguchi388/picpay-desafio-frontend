import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;

    component.placeholder = 'Search';
    component.handleSearch = (value: string) => value;
    component.onChangeDelay = 100;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should input a value and call the handleSearch function', fakeAsync(() => {
    const spyInputOnChange = spyOn(component, 'handleSearch');

    component.value = 'new User';
    component.onChange();
    tick(200);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spyInputOnChange).toHaveBeenCalledWith(component.value);
    });

  }));
});
