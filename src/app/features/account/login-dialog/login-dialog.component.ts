import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  SignInRequest,
  UsersService,
} from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
})
export class LoginDialogComponent {
  signInRequest: SignInRequest = { username: '', password: '' };

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private usersService: UsersService
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  login(): void {
    this.usersService.signIn(this.signInRequest).subscribe((response) => {
      this.dialogRef.close(response);
    });
  }
}
