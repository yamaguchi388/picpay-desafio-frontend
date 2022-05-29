/* eslint-disable no-undef */
import { NotificationService } from './notification.service';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
