import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Expense } from '../model/expense';

@Component({
  selector: 'app-expense-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './expense-add.component.html',
  styleUrl: './expense-add.component.css'
})
export class ExpenseAddComponent {
  expense: Expense = {
    id: 5, // can be omitted if auto-generated
    userId: parseInt(localStorage.getItem('id') || '0', 10),
    amount: 0,
    expenseDate: new Date(),  
    categoryId: 0,
    currencyId: 0,
    comments: '',
    createdAt: new Date()
  };

    constructor(private expenseService: ExpenseService, private router: Router, private userService: UserService) {}
    ngOnInit(): void {
      if(this.userService.authHeader == null) {
        this.router.navigate(["login"]);
      }


    }

    addTheExpense() {
      this.expenseService.createExpense(this.expense).subscribe({
        next: () => this.router.navigate(['/expenses']),
        error: (err) => console.error('Error creating expense:', err)
      });
    }
}
