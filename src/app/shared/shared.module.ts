import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InvoiceListComponent],
  imports: [
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatOptionModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatOptionModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InvoiceListComponent,
  ],
})
export class SharedModule {}
