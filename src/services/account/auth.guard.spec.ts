import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let router: Router;
    let guard = new AuthGuard(router);

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
