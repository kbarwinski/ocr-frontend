import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

import { SnackBarComponent } from '../layout/loading-snackbar/loading-snackbar.component';

@Injectable()
export class SnackBarMessageService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * @param duration - duration in seconds.
   */
  open(message: string, action: string, duration: number) {
    return this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message, action },
      duration: duration * 1000,
    });
  }
}
