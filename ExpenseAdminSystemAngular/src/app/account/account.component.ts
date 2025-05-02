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
}
