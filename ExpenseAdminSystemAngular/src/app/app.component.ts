import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ExpenseComponent } from './expense/expense.component';
import { CurrencyComponent } from './currency/currency.component';
import { CategoryComponent } from './category/category.component';
import { UserListComponent } from './user-list/user-list.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CategoryListComponent } from './category-list/category-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent, UserListComponent, ExpenseComponent, ExpenseListComponent, CurrencyComponent, CurrencyListComponent, CategoryComponent, CategoryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExpenseAdminSystemAngular';
}
