import { Injectable } from '@angular/core';
import { UserDto } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtToken: string | null = localStorage.getItem('Auth');
  private roles: string[] = [];

  constructor() {
    const roles = localStorage.getItem('Roles');
    if (roles) {
      this.roles = roles.split(',');
    }
  }

  public setUserInfo(user: UserDto): void {
    this.jwtToken = user.jwtToken;
    localStorage.setItem('Auth', user.jwtToken);

    this.roles = user.userInfo.roles;
    localStorage.setItem('Roles', this.roles.toString());
  }

  public getToken(): string | null {
    return this.jwtToken;
  }

  public hasRoles(rolesToCheck: string[]): boolean {
    return rolesToCheck.some((role) => this.roles.includes(role));
  }

  public clearUserInfo(): void {
    this.jwtToken = null;
    this.roles = [];
    localStorage.removeItem('Auth');
    localStorage.removeItem('Roles');
  }
}
