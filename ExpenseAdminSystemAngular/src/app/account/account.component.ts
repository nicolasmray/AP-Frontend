import { Component } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [UserComponent, MatIconModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  user?: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if(this.userService.authHeader == null) {
      this.router.navigate(["login"]);
    }

    const userIdString = localStorage.getItem('id');

    if (userIdString) {
      const userId = Number(userIdString);
      this.userService.getUser(userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Failed to fetch user:', err);
        }
      });
    } else {
      console.warn('No user ID found in localStorage');
    }
  }

  goToEditAccount(): void {
    this.router.navigate(['account-edit'])
  }

  deleteAccount(): void {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
  
    if (!confirmed) {
      this.router.navigate(['account']);
      return;
    }
  
    const userIdString = localStorage.getItem('id');
    if (!userIdString) {
      console.error('No user ID in local storage.');
      return;
    }
  
    const userId = Number(userIdString);
  
    this.userService.deleteUser(userId).subscribe({
      next: () => {
     
        localStorage.removeItem('headerValue');
        localStorage.removeItem('username');
        localStorage.removeItem('id');

        this.router.navigate(['home']);
      },
      error: (err: HttpErrorResponse) => {

        const errorMessage = err.error?.message || err.message;
        console.error('Failed to delete user:', new Error(errorMessage));
      }
    });
  }
}