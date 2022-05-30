import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  const snackbar: jasmine.SpyObj<MatSnackBar> =
    jasmine.createSpyObj<MatSnackBar>('MatSnackBar', {
      open: undefined,
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [{ provider: MatSnackBar, useValue: snackbar }],
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackbar open', () => {
    spyOn(service['snackBar'], 'open');
    service.openSnackBar('TESTE', null);
    expect(service['snackBar'].open).toHaveBeenCalledWith('TESTE', null, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  });
});
