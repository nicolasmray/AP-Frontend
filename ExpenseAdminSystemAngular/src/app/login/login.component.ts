import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor(public auth: AuthService, private router: Router) {
    
  }

  login() {
    if(this.username != null && this.password != null) {
      this.auth.authenticate(this.username, this.password).subscribe( (auth) => {
        if(auth != null) {
          localStorage.setItem('headerValue', auth.headerValue);
          this.router.navigate(['user-list'])
        }
      })
    }
  }

}
