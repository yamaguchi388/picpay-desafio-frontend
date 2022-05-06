import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

describe('AuthService', () => {
    let http: HttpClient;
    let service = new AuthService(http);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
