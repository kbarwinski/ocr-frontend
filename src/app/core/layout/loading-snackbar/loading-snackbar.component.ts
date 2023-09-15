import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-component',
  templateUrl: './loading-snackbar.component.html',
  styleUrls: ['./loading-snackbar.component.sass'],
})
export class SnackBarComponent {
  progress = 0;
  private currentIntervalId: number = 0;

  /** Data that was injected into the snack bar. */
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<SnackBarComponent>
  ) {
    this.snackBarRef.afterOpened().subscribe(
      () => {
        const duration =
          this.snackBarRef.containerInstance.snackBarConfig.duration ?? 0;
        this.runProgressBar(duration);
      },
      (error) => console.error(error)
    );
  }

  dismissWithAction() {
    this.cleanProgressBarInterval();
    this.snackBarRef.dismissWithAction();
  }

  /**
   * @param duration - in milliseconds
   */
  runProgressBar(duration: number) {
    this.progress = 100;
    const step = 0.005;
    this.cleanProgressBarInterval();
    setInterval(() => {
      this.progress -= 100 * step;
      if (this.progress < 0) {
        this.cleanProgressBarInterval();
      }
    }, duration * step);
  }

  cleanProgressBarInterval() {
    clearInterval(this.currentIntervalId);
  }
}
