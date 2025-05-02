import { Component } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-edit',
  standalone: true,
  imports: [UserComponent, FormsModule],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.css'
})
export class AccountEditComponent {
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

  confirmPassword: string = '';

  saveChanges(): void {
    if (this.user && this.userService.authHeader) {
      console.log('Sending user to update FROM SAVECHANGES():', this.user);
      this.userService.updateUser(this.user).subscribe({
        next: () => this.router.navigate(['account']),
        error: (err) => console.error('Update failed:', err)
      });
    }
    this.router.navigate(['account'])
  }




}
