import { Component } from '@angular/core';
import { InvoicesService } from '../../../core/services/invoices.service';

@Component({
  selector: 'app-rng-invoice-button',
  templateUrl: './rng-invoice-button.component.html',
  styleUrls: ['./rng-invoice-button.component.sass']
})
export class RngInvoiceButtonComponent {
  constructor(private invoicesService: InvoicesService) {}

  generateAndDownloadInvoice() {
    this.invoicesService.generateRandomInvoicePdf().subscribe(
      (pdfBlob: Blob) => {
        const downloadUrl = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'random_invoice.pdf';
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      (error: any) => {
        console.error('Error generating invoice PDF:', error);
      }
    );
  }
}
