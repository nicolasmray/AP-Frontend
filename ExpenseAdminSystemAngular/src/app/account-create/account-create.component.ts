import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-create',
  standalone: true,
  imports: [UserComponent, FormsModule, CommonModule],
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.css'
})
export class AccountCreateComponent {

user?: User;

  constructor(private userService: UserService, private router: Router,public auth: AuthService,) {}
  
  confirmPassword: string = '';

  ngOnInit(): void {
    this.user = {
      id: 0, 
      userName: '',
      email: '',
      password: '',
      createdAt: new Date()
    }
  }


  saveChanges(): void {
    if (!this.user) return;
  
    // Update the user details
    const updatedUser = { ...this.user };
    this.userService.createUser(this.user).subscribe({
      next: () => {
        // After successful update, authenticate with the NEW credentials
        this.auth.authenticate(updatedUser.userName, updatedUser.password).subscribe({
          next: (auth) => {
            if (auth) {
              localStorage.setItem('headerValue', auth.headerValue);
              localStorage.setItem('username', auth.username);
              localStorage.setItem('id', auth.id);
            }
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.error('Authentication failed:', err);
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
