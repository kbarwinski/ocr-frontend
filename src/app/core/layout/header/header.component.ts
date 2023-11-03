import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/features/account/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from 'src/app/features/account/registration-dialog/registration-dialog.component';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Output() menuClickEvent = new EventEmitter<void>();

  hasAnyRole(): boolean {
    return this.authService.hasRoles(['Admin', 'User']);
  }

  handleLogout(): void {
    this.usersService.signOut().subscribe((response) => {});
    console.log('test');
  }

  openDialog(isLogin: boolean): void {
    const dialogRef = isLogin
      ? this.dialog.open(LoginDialogComponent)
      : this.dialog.open(RegistrationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleSidenav() {
    this.menuClickEvent.emit();
  }
}
