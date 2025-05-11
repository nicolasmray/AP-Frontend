import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Expense } from '../model/expense';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-expense-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './expense-add.component.html',
  styleUrl: './expense-add.component.css'
})
export class ExpenseAddComponent {
  expense: Expense = {
    id: 5, 
    userId: parseInt(localStorage.getItem('id') || '0', 10),
    amount: null!,
    expenseDate: new Date(),  
    categoryId: null!,
    currencyId: 2,
    comments: "",
    createdAt: new Date()
  };
  errorMessage: string = '';

  constructor(
    private expenseService: ExpenseService, 
    private router: Router, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if(this.userService.authHeader == null) {
      this.router.navigate(["login"]);
    }
  }

  addTheExpense() {
    this.errorMessage = ''; 
    
    this.expenseService.createExpense(this.expense).subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err: HttpErrorResponse) => {
        
        const error = new Error(err.error?.message || err.message);
        
        // Log both the original error and the transformed error
        console.error('Error creating expense:', err); // Original log
        console.error('Failed to add expense:', error); // Test-expected log
        
        this.errorMessage = err.error?.message || 'Failed to add expense. Please try again.';
      }
    });
  }
}