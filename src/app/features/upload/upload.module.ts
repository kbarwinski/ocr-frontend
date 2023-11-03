import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { RngInvoiceButtonComponent } from './rng-invoice-button/rng-invoice-button.component';
import { UploadFormComponent } from './upload-form/upload-form.component';


@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule
  ]
})
export class UploadModule { }
