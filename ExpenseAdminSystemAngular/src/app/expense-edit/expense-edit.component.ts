import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ExpenseComponent } from '../expense/expense.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Expense } from '../model/expense';

@Component({
  selector: 'app-expense-edit',
  standalone: true,
  imports: [ExpenseComponent, FormsModule, CommonModule],
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.css'
})
export class ExpenseEditComponent {
expense?: Expense;

constructor(private expenseService: ExpenseService, private router: Router, private userService: UserService) {}
    ngOnInit(): void {
      if(this.userService.authHeader == null) {
        this.router.navigate(["login"]);
      }


    }

    editExpense() {
      
      this.expenseService.updateExpense(this.expense).subscribe({
        next: () => this.router.navigate(['/expenses']),
        error: (err) => console.error('Error creating expense:', err)
      });
    }


}
