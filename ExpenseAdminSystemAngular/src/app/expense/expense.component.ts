import { Component, Input } from '@angular/core';
import { Expense } from '../model/expense';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  @Input() expense?: Expense; 
}
