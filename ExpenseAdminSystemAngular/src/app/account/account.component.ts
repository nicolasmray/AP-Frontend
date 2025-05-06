import { Component } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [UserComponent],
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
    const userIdString = localStorage.getItem('id');
    if (!userIdString) {
      console.error('No user ID in local storage.');
      return;
    }
  
    const userId = Number(userIdString);
  
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        // Clear user-related data from local storage
        localStorage.removeItem('headerValue');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
  
        // Optionally, clear everything
        // localStorage.clear();
  
        // Navigate after successful deletion
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error('Failed to delete user:', err);
      }
    });
  }
  


}
