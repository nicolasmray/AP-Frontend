import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  expenseId!: number;
  expense?: Expense;

constructor(private expenseService: ExpenseService, private router: Router, private userService: UserService, private route: ActivatedRoute) {}
    ngOnInit(): void {
      if(this.userService.authHeader == null) {
        this.router.navigate(["login"]);
      }

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.expenseId = +idParam; // Convert string to number with +
        console.log('Expense ID from route:', this.expenseId);

        this.expenseService.getExpense(this.expenseId).subscribe({
          next: (data) => {
            this.expense = data;
          },
          error: (err) => {
            console.error('Failed to fetch expense:', err);
          }
        });
      } else {
        console.error('No expense ID found in route!');
        this.router.navigate(['/expenses']);
      }


    }

    editExpense() {
      
      this.expenseService.updateExpense(this.expense!).subscribe({
        next: () => this.router.navigate(['/expenses']),
        error: (err) => console.error('Error creating expense:', err)
      });
    }


}

