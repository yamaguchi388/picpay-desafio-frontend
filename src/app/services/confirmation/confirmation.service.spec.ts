import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmationService } from './confirmation.service';

describe('ConfirmationService', () => {
  let confirmationDialogService: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule],
    });
    confirmationDialogService = TestBed.inject(ConfirmationService);
  });

  it('should be created', () => {
    expect(confirmationDialogService).toBeTruthy();
  });

  it('should open confirmation Dialog', () => {
    spyOn(confirmationDialogService, 'openConfirmationDialog').and.callThrough();
    confirmationDialogService.openConfirmationDialog({ message: 'dialog message', title: 'dialog title' });
    expect(confirmationDialogService.openConfirmationDialog).toHaveBeenCalled();
  });
});
