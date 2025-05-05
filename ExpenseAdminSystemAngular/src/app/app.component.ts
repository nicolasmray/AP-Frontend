import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ExpenseComponent } from './expense/expense.component';
import { CurrencyComponent } from './currency/currency.component';
import { CategoryComponent } from './category/category.component';
import { UserListComponent } from './user-list/user-list.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent, UserComponent, UserListComponent, ExpenseComponent, ExpenseListComponent, CurrencyComponent, CurrencyListComponent, CategoryComponent, CategoryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExpenseAdminSystemAngular';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}
  
  ngOnInit() {
    // Check localStorage at the start
    this.isAuthenticated = !!localStorage.getItem('headerValue');
    // The '!!' turns it into true/false directly
  }


  redirectHome() {
    this.router.navigate(['home'])
  }

  redirectExpenses() {
    this.router.navigate(['expenses'])
  }
  redirectAccount() {
    this.router.navigate(['account'])
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['home'])
    window.location.reload();
  }


}
