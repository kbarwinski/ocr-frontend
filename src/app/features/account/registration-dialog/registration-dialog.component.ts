import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  SignUpRequest,
  UsersService,
} from 'src/app/core/services/users.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
})
export class RegistrationDialogComponent {
  signUpRequest: SignUpRequest = { username: '', password: '' };

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private usersService: UsersService
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  register(): void {
    this.usersService.signUp(this.signUpRequest).subscribe((response) => {
      this.dialogRef.close(response);
    });
  }
}
