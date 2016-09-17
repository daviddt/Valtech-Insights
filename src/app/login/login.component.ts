import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './../common/interfaces/user';

import { AuthService } from './../common/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login(event: Event, data: User) {
    this.auth.login(data)
      .subscribe(
        response => {
          const token = response.json().token;
          localStorage.setItem('id_token', token);
          this.router.navigate(['dashboard'])
        },
        error => {
          console.log(error);
        }
      )
  }

  ngOnInit() { }
}