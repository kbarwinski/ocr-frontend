import { Component } from '@angular/core';
import { InvoicesService } from 'src/app/core/services/invoices.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.sass'],
})
export class UploadFormComponent {
  constructor(private invoicesService: InvoicesService) {}

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      this.invoicesService.upload(files).subscribe((response: any) => {
        console.log(response);
      });
    }
  }
}
