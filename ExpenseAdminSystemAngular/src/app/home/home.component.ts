import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string | null = '';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.isAuthenticated = !!localStorage.getItem('headerValue'); // adjust key if needed
    //window.location.reload();
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('reloaded'); // Cleanup so it can reload again in future if needed
    }
    
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToCreateAccount(): void {
    this.router.navigate(['/createAccount']);
  }
}



