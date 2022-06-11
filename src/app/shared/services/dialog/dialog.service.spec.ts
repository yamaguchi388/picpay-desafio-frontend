import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    const matDialogStub = () => ({
      open: unavailableComponent => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    service = TestBed.inject(DialogService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
