import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUpdateTaskComponent } from './modal-add-update-task.component';

describe('ModalAddUpdateTaskComponent', () => {
  let component: ModalAddUpdateTaskComponent;
  let fixture: ComponentFixture<ModalAddUpdateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddUpdateTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddUpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
