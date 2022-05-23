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
    const payment = {
      id: '10',
      name: 'John Doe',
      username: 'jdoe',
      email: 'email@email.com',
      title: 'titulozinho',
      value: 123.45,
      date: new Date(),
      isPayed: true,
    };
    component.payment = payment;
    fixture.detectChanges();
    const userName = fixture.nativeElement.querySelector('.username')!;
    const userNick = fixture.nativeElement.querySelector('.nickname')!;
    expect(userName.textContent).toContain(payment.name);
    expect(userNick.textContent).toContain(payment.username);
  });
});
