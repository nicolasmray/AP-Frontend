import { Component } from '@angular/core';
import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';
import { ExpenseComponent } from '../expense/expense.component';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [ExpenseComponent],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}
  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe(listOfExpenses=>{
      this.expenses = listOfExpenses
    })
  }

}
