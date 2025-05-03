import { Component } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-edit',
  standalone: true,
  imports: [UserComponent, FormsModule],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.css'
})
export class AccountEditComponent {
user?: User;

  constructor(private userService: UserService, private router: Router,public auth: AuthService,) {}
  

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

  confirmPassword: string = '';

  saveChanges(): void {
    if (!this.user) return;
  
    // First update the user details
    const updatedUser = { ...this.user };
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        // After successful update, authenticate with the NEW credentials
        this.auth.authenticate(updatedUser.userName, updatedUser.password).subscribe({
          next: (auth) => {
            if (auth) {
              localStorage.setItem('headerValue', auth.headerValue);
              localStorage.setItem('username', auth.username);
              localStorage.setItem('id', auth.id);
            }
            // Navigate only after authentication completes
            this.router.navigate(['account']);
          },
          error: (err) => {
            console.error('Authentication failed:', err);
            // Still navigate even if auth fails (or handle differently)
            this.router.navigate(['account']);
          }
        });
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
  }


}
