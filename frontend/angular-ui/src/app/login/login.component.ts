import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: string;
  password: string;
  message: string = 'You are log out';

  auth: AuthService;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.auth = this.authService;

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', []),
    });
  }

  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = 'You are log in.';
    } else {
      this.message = 'Incorrect email or password.'
    }
  }

  onSubmit() {
    if (this.auth.isLoggedIn) {
      this.logout();

    } else {
      this.login();
    }
  }
  login() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    //debugger;
    this.message = 'Now connecting...';
    this.auth.login(this.email, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if (isLoggedIn) {
          this.router.navigate(['/students']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
      })
  }

  logout() {
    this.auth.logout();
    this.message = 'You are log out.';
  }

}