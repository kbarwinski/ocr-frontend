import { Component, OnInit } from '@angular/core';
import {
  GetInvoicesListQuery,
  InvoiceDto,
  InvoicesService,
} from '../../core/services/invoices.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { SignalRService } from 'src/app/core/services/signalr.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/core/layout/loading-snackbar/loading-snackbar.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass'],
})
export class LandingComponent implements OnInit {
  constructor(
    private invoicesService: InvoicesService,
    private signalrService: SignalRService,
    private snackBar: MatSnackBar
  ) {}

  public invoices: InvoiceDto[] = [];
  public checkboxValues: any = {};
  public isLoading: boolean = true;

  public filterChecks: any = this.getFromLocalStorage('filterChecks') || {
    scannedYes: false,
    scannedNo: false,
    parsedYes: false,
    parsedNo: false,
    approvedYes: false,
    approvedNo: false,
  };

  public pagingOptions: number[] = [3, 5, 10, 25, 100];

  public paginationArgs: GetInvoicesListQuery = this.getFromLocalStorage(
    'paginationArgs'
  ) || {
    page: 0,
    pageSize: 5,
    totalCount: 0,
    sortingOrders: 'id asc',
    startDate: null,
    endDate: null,
    isScanned: null,
    isParsed: null,
    isApproved: null,
  };

  public invoiceDateRange = new FormGroup({
    start: new FormControl<Date | null>(this.paginationArgs.startDate),
    end: new FormControl<Date | null>(this.paginationArgs.endDate),
  });

  saveToLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): any {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  public checkAll(on: boolean) {
    Object.keys(this.checkboxValues).forEach(
      (x) => (this.checkboxValues[x] = on)
    );
  }

  public getActiveCheckboxIds() {
    return Object.keys(this.checkboxValues).filter(
      (x) => this.checkboxValues[x] == true
    );
  }

  private toggleLogic(a: boolean, b: boolean) {
    if (a === b) return null;
    return a;
  }

  public saveToggles(mode: number) {
    const options = ['Scanned', 'Parsed', 'Approved'];
    const res = this.toggleLogic(
      this.filterChecks[options[mode].toLowerCase() + 'Yes'],
      this.filterChecks[options[mode].toLowerCase() + 'No']
    );
    this.paginationArgs['is' + options[mode]] = res;

    this.saveToLocalStorage('filterChecks', this.filterChecks);
    this.saveToLocalStorage('paginationArgs', this.paginationArgs);

    this.fetchInvoices();
  }

  public batchControls(mode: number) {
    let invoiceIds = this.getActiveCheckboxIds();
    console.log(invoiceIds);
    switch (mode) {
      case 0:
        this.invoicesService.batchScan(invoiceIds).subscribe();
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: 'Batch scan in progress...', progress: 50 },
        });
        break;
      case 1:
        this.invoicesService.batchAnalyze(invoiceIds).subscribe();
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: 'Batch parsing in progress...', progress: 50 },
        });
        break;
      case 2:
        this.invoicesService
          .batchDelete(invoiceIds)
          .subscribe((response: any) => {
            this.fetchInvoices();
          });
        break;
      default:
    }
  }

  public fetchInvoices() {
    this.isLoading = true;
    this.invoicesService.getPage(this.paginationArgs).subscribe(
      (response: any) => {
        this.invoices = response.result;
        this.paginationArgs.totalCount = response.pagination.totalCount;

        this.checkboxValues = {};
        this.invoices.forEach((x) => {
          this.checkboxValues[x.id] = false;
        });

        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchInvoices();
    this.signalrService.startConnection();

    this.invoiceDateRange.valueChanges.subscribe((value) => {
      if (value.start && value.end && this.invoiceDateRange.valid) {
        this.paginationArgs.startDate = value.start;
        this.paginationArgs.endDate = value.end;

        this.saveToLocalStorage('paginationArgs', this.paginationArgs);
        this.fetchInvoices();
      }
    });

    this.signalrService.addTransferDataListener('"BatchScanCompleted"', () => {
      this.fetchInvoices();
    });

    this.signalrService.addTransferDataListener(
      '"BatchAnalyzingCompleted"',
      () => {
        this.fetchInvoices();
      }
    );
  }

  clearDateRange(): void {
    this.invoiceDateRange.setValue({ start: null, end: null });
    this.paginationArgs.startDate = null;
    this.paginationArgs.endDate = null;
    this.saveToLocalStorage('paginationArgs', this.paginationArgs);
    this.fetchInvoices();
  }

  handlePageEvent(event: PageEvent) {
    this.paginationArgs.page = event.pageIndex;
    this.paginationArgs.pageSize = event.pageSize;

    this.saveToLocalStorage('paginationArgs', this.paginationArgs);
    this.fetchInvoices();
  }
}
