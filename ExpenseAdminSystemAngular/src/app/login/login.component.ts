// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

//   username!: string;
//   password!: string;

//   constructor(public auth: AuthService, private router: Router) {
    
//   }

//   login() {
//     if(this.username != null && this.password != null) {
//       this.auth.authenticate(this.username, this.password).subscribe( (auth) => {
//         if(auth != null) {
//           localStorage.setItem('headerValue', auth.headerValue);
//           localStorage.setItem('username', auth.username);
//           localStorage.setItem('id', auth.id);

//           this.router.navigate(['home'])
//         }
//       })
//     }
//   }

// }


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username!: string;
  password!: string;
  loginError: string = ''; 

  constructor(public auth: AuthService, private router: Router) {}

  login() {
    if (this.username != null && this.password != null) {
      this.auth.authenticate(this.username, this.password).subscribe({
        next: (auth) => {
          if (auth != null) {
            localStorage.setItem('headerValue', auth.headerValue);
            localStorage.setItem('username', auth.username);
            localStorage.setItem('id', auth.id);

            this.router.navigate(['home']);
          }
        },
        error: (err) => {
          console.error('Authentication failed:', err);
          // You could also add a user-friendly message here or set a flag
          // to show an error message in the UI if needed.
          this.loginError = 'Invalid username or password. Please try again.';
        }
      });
    }
  }
}
