import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

import { SnackBarComponent } from '../layout/loading-snackbar/loading-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarMessageService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * @param duration - duration in seconds.
   */
  open(message: string, action: string, duration: number | null | undefined) {
    this.close();

    return this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message, action },
      duration: (duration as number) * 1000 ?? undefined,
    });
  }

  close() {
    this.snackBar.dismiss();
  }
}
