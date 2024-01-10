import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl } from './constants/baseurl';
import { AuthService } from './auth.service';

const url = baseUrl + '/users';
const headers = new HttpHeaders().set('Accept', 'text/plain');

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
}

export interface UserDto {
  jwtToken: string;
  userInfo: {
    id: string;
    userName: string;
    roles: string[];
  };
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  signIn(request: SignInRequest): Observable<any> {
    return this.http
      .post<UserDto>(url + '/signin', request, { headers })
      .pipe(tap((userDto) => this.authService.setUserInfo(userDto)));
  }

  signUp(request: SignUpRequest): Observable<any> {
    return this.http
      .post<UserDto>(url + '/signup', request, { headers })
      .pipe(tap((userDto) => this.authService.setUserInfo(userDto)));
  }

  signOut(): Observable<any> {
    this.authService.clearUserInfo();
    return this.http.post(url + '/signout', null);
  }
}
