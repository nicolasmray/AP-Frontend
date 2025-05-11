import { Component, Input } from '@angular/core';
import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  @Input() expense?: Expense; 

  categoryMap: { [key: number]: string } = {
    1: 'Food',
    2: 'Transport',
    3: 'Entertainment',
    4: 'Utilities',
    5: 'Health',
    6: 'Other'
  };
  
  currencyMap: { [key: number]: string } = {
    1: 'USD',
    2: 'EUR',
    3: 'GBP',
    4: 'DKK',
    5: 'SEK'
  };

  constructor(private expenseService: ExpenseService, private router: Router, private userService: UserService) {}
  
  // onDelete(): void {
  //   //console.log('Delete clicked for expense ID:', this.expense?.id);
  
  //   this.expenseService.deleteExpense(this.expense!.id).subscribe({
  //     next: () => {
  //       this.router.navigate(['/expenses']).then(() => {
  //         window.location.reload(); 
  //       });
  //     },
  //     error: (err) => console.error('Error deleting expense:', err)
  //   });
  // }

  onDelete(): void {
    const confirmed = confirm('Are you sure you want to delete this expense? This action cannot be undone.');
  
    if (!confirmed) {
      this.router.navigate(['/expenses']);
      return;
    }
  
    if (!this.expense) return;
  
    this.expenseService.deleteExpense(this.expense.id).subscribe({
      next: () => {
        this.router.navigate(['/expenses']).then(() => {
          window.location.reload(); 
        });
      },
      error: (err) => console.error('Error deleting expense:', err)
    });
  }
  

  onEdit(): void {
    this.router.navigate(['/expenseEdit', this.expense!.id])
   }
  
}
