import { tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';

import { Injectable } from '@angular/core';

import { User } from './../interfaces/user';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}
  login(user: User) {
    return this.http.post('https://teamplanner.efocus.nl/services/login', user);
  }
  loggedIn() {
    const token = localStorage.getItem('id_token');

    if (!token) {
      return false;
    }

    if (token.split('.').length !== 3) {
      return false;
    }

    return tokenNotExpired();
  }
}