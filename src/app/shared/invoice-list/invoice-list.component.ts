import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { InvoicesService } from 'src/app/core/services/invoices.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.sass'],
})
export class InvoiceListComponent {
  @Input() invoices!: any[];
  @Input() checkboxValues!: any;
  @Input() isLoading!: boolean;

  @Output() paginationChange = new EventEmitter<PageEvent>();

  constructor(
    private router: Router,
    private invoicesService: InvoicesService
  ) {}

  saveToLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): any {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  public viewDetails(invoiceId: string) {
    this.saveToLocalStorage(
      'invoiceIds',
      this.invoices.map((x) => x.id)
    );

    this.router.navigate(['/invoice', invoiceId]);
  }

  public onCheckboxChange(invoiceId: string, event: any) {
    event.preventDefault();
    this.checkboxValues[invoiceId] = !this.checkboxValues[invoiceId];
  }

  public deleteInvoice(invoiceId: string) {
    this.invoicesService.delete(invoiceId).subscribe((response: any) => {
      this.paginationChange.emit();
    });
  }
}
