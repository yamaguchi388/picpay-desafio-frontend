import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean | UrlTree> {
    return this.authService.getUser().pipe(
      map((user) => !!user),
      tap((user) => {
        if (!!!user) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
