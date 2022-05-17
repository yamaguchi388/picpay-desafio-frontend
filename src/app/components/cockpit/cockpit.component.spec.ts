import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from 'src/app/services/user.service';

import { CockpitComponent } from './cockpit.component';

describe('CockpitComponent', () => {
  let componentCockpit: CockpitComponent;
  let fixture: ComponentFixture<CockpitComponent>;
  const userServiceStub = {
    logout: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CockpitComponent],
      imports: [ MatMenuModule ],
      providers: [
        { provide: UserService, useValue: userServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitComponent);
    componentCockpit = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentCockpit).toBeTruthy();
  });

  it('should call logout method', () => {
    spyOn(userServiceStub, 'logout').and.callThrough();
    componentCockpit.logout();
    expect(userServiceStub.logout).toHaveBeenCalled();
  });
});
