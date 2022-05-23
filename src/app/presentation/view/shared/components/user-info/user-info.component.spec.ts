import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';

import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name and nick', () => {
    const user = {
      id: '10',
      name: 'John Doe',
      nick: 'jdoe',
      email: 'email@email.com',
      title: 'titulozinho',
    };
    component.user = user;
    fixture.detectChanges();
    const userName = fixture.nativeElement.querySelector('.username')!;
    const userNick = fixture.nativeElement.querySelector('.nickname')!;
    expect(userName.textContent).toContain(user.name);
    expect(userNick.textContent).toContain(user.nick);
  });
});
