import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HostListener } from '@angular/core';

import {
  Details,
  FullInvoiceDto,
  InvoicesService,
  InvoiceUpdateModel,
} from 'src/app/core/services/invoices.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private invoicesService: InvoicesService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  private routeSub!: Subscription;

  protected form!: FormGroup;
  protected invoiceIds!: string[];

  protected currentIndex!: number;
  protected totalCount!: number;

  protected prev!: string;
  protected next!: string;

  get detailsFormArray() {
    return this.form.get('details') as FormArray;
  }

  public invoice!: FullInvoiceDto;

  public isLoading: boolean = true;

  hasUserRole(): boolean {
    return this.authService.hasRoles(['User']);
  }

  saveToLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): any {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

  cycleDetails(isNext: boolean) {
    if (isNext && this.next !== undefined) {
      this.router.navigate(['/invoice', this.next]);
    } else if (!isNext && this.prev !== undefined) {
      this.router.navigate(['/invoice', this.prev]);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.navigateBack();
    } else if (event.key === 'ArrowRight') {
      this.cycleDetails(true);
    } else if (event.key === 'ArrowLeft') {
      this.cycleDetails(false);
    }
  }

  scanInvoice() {
    if (this.invoice.id) {
      this.invoicesService.scan(this.invoice.id).subscribe((response: any) => {
        this.invoice.isScanned = true;
      });
    }
  }

  analyzeInvoice() {
    if (this.invoice.id) {
      this.invoicesService
        .analyze(this.invoice.id)
        .subscribe((response: any) => {
          this.setDetails(response);
          if (this.invoice.details.length <= 0) this.invoice.details = response;
        });
    }
  }

  updateInvoice() {
    if (this.invoice.id) {
      const updatedDetails = this.form.value.details;

      this.invoicesService
        .updateDetails(this.invoice.id, updatedDetails)
        .subscribe((response: any) => {
          this.invoice = response;
        });
    }
  }

  toggleApproval() {
    if (this.invoice.id) {
      const toUpdate: InvoiceUpdateModel = {
        isApproved: !this.invoice.isApproved,
        isParsed: this.invoice.isParsed,
        isScanned: this.invoice.isScanned,
        name: this.invoice.name,
      };

      this.invoicesService
        .update(this.invoice.id, toUpdate)
        .subscribe((response: any) => {
          this.invoice = response;
        });
    }
  }

  setDetails(details: Details[]) {
    const detailsArray = this.form.get('details') as FormArray;

    detailsArray.clear();

    details
      .sort((d1, d2) => (d1.name > d2.name ? 1 : -1))
      .forEach((detail) => {
        detailsArray.push(
          this.fb.group({
            name: detail.name,
            value: detail.value,
            defaultValue: detail.value,
            certainty: detail.certainty,
          })
        );
      });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      details: this.fb.array([]),
    });

    this.routeSub = this.route.params.subscribe((params) => {
      let invoiceId = params['id'];

      this.invoicesService
        .get(this.router.url.split('/')[2])
        .subscribe((response: any) => {
          this.invoice = response;
          this.setDetails(this.invoice.details);
          this.isLoading = false;

          this.invoiceIds = this.getFromLocalStorage('invoiceIds');
          this.currentIndex = this.invoiceIds.indexOf(invoiceId);
          this.totalCount = this.invoiceIds.length;

          this.prev = this.invoiceIds[this.currentIndex - 1];
          this.next = this.invoiceIds[this.currentIndex + 1];
        });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
