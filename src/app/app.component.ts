import { Component, OnInit } from '@angular/core';
import { SignalRService } from './core/services/signalr.service';
import { SnackBarMessageService } from './core/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'ocr-invoice-frontend';

  constructor(
    private signalrService: SignalRService,
    private snackBarService: SnackBarMessageService
  ) {}

  ngOnInit() {
    this.signalrService.startConnection();

    this.signalrService.addTransferDataListener('"BatchScanCompleted"', () => {
      this.snackBarService.open('Batch scan had finished', '', 3);
    });

    this.signalrService.addTransferDataListener(
      '"BatchAnalyzingCompleted"',
      () => {
        this.snackBarService.open('Batch parsing had finished', '', 3);
      }
    );
  }
}
