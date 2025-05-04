import { Component, Input } from '@angular/core';
import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  @Input() expense?: Expense; 

  constructor(private expenseService: ExpenseService, private router: Router, private userService: UserService) {}
  onDelete(): void {
    // This is where you'll call the delete method from your service
    console.log('Delete clicked for expense ID:', this.expense?.id);
  
    // TODO: Call delete method from service when ready
    this.expenseService.deleteExpense(this.expense!.id).subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err) => console.error('Error deleting expense:', err)
    });
  }
  
}
