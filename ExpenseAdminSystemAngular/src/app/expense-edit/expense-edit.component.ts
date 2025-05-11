import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ExpenseComponent } from '../expense/expense.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Expense } from '../model/expense';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-expense-edit',
  standalone: true,
  imports: [ExpenseComponent, FormsModule, CommonModule],
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.css'
})
export class ExpenseEditComponent {
  expenseId!: number;
  expense?: Expense;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private expenseService: ExpenseService, 
    private router: Router, 
    private userService: UserService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(this.userService.authHeader == null) {
      this.router.navigate(["login"]);
      return;
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.expenseId = +idParam;
      this.loadExpense();
    } else {
      console.error('No expense ID found in route!');
      this.router.navigate(['/expenses']);
    }
  }

  loadExpense(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.expenseService.getExpense(this.expenseId).subscribe({
      next: (data) => {
        this.expense = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        const error = new Error(err.error?.message || err.message);
        console.error('Error loading expense:', error); 
        console.error('Failed to fetch expense:', err); 
        this.errorMessage = err.error?.message || 'Failed to load expense. Please try again.';
      }
    });
  }

  editExpense(): void {
    if (!this.expense) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    this.expenseService.updateExpense(this.expense).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/expenses']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        const error = new Error(err.error?.message || err.message);
        console.error('Failed to update expense:', error); 
        console.error('Error updating expense:', err); 
        this.errorMessage = err.error?.message || 'Failed to update expense. Please try again.';
      }
    });
  }
}
