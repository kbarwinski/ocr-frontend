import { Component, OnInit } from '@angular/core';
import { SignalRService } from './core/services/signalr.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './core/layout/loading-snackbar/loading-snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'ocr-invoice-frontend';

  constructor(
    private signalrService: SignalRService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit() {
    this.signalrService.startConnection();

    this.signalrService.addTransferDataListener('"BatchScanCompleted"', () => {
      this.snackBar.dismiss();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Batch scan had finished.', progress: 100 },
      });
    });

    this.signalrService.addTransferDataListener(
      '"BatchAnalyzingCompleted"',
      () => {
        this.snackBar.dismiss()
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: 'Batch parsing had finished.', progress: 100 },
        });
      }
    );
  }
}
