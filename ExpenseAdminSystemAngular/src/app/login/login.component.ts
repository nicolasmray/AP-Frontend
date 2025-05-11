import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';
  isLoading: boolean = false;

  constructor(public auth: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.loginError = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    this.auth.authenticate(this.username, this.password).subscribe({
      next: (auth) => {
        this.isLoading = false;
        if (auth) {
          localStorage.setItem('headerValue', auth.headerValue);
          localStorage.setItem('username', auth.username);
          localStorage.setItem('id', auth.id.toString());
          this.router.navigate(['home']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const errorObj = new Error(err.error?.message || err.message);
        console.error('AuthService error:', err); 
        console.error('Authentication failed:', errorObj); 
        this.handleLoginError(err);
      }
    });
  }

  private handleLoginError(err: HttpErrorResponse) {
    if (err.status === 401 || err.status === 403) {
      this.loginError = 'Invalid username or password';
    } else if (err.status === 0) {
      this.loginError = 'Network error - please check your connection';
    } else {
      this.loginError = 'Login failed - please try again later';
    }
  }
}
