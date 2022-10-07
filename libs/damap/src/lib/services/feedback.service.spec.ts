import {TestBed} from '@angular/core/testing';

import {FeedbackService} from './feedback.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateTestingModule} from '../testing/translate-testing/translate-testing.module';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let matSnackBar: MatSnackBar;
  const mockMatSnackBar = {
    open: () => {
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      providers: [{provide: MatSnackBar, useValue: mockMatSnackBar},]
    });
    service = TestBed.inject(FeedbackService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar with success config', () => {
    const matSnackBarSpy = spyOn(matSnackBar, 'open').and.stub();

    service.success('Success message');

    expect(matSnackBarSpy.calls.count()).toBe(1);

    const args = matSnackBarSpy.calls.argsFor(0);
    expect(args.length).toBe(3);
    expect(args[0]).toBe('Success message');
    expect(args[1]).toBe('x');
    expect(args[2]).toEqual({
      duration: 4500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-success'
    });
  });
});
