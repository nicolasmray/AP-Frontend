import { Component } from '@angular/core';
import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';
import { ExpenseComponent } from '../expense/expense.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [ExpenseComponent],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
expenses: Expense[] = [];


  constructor(private expenseService: ExpenseService, private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    if(this.userService.authHeader == null) {
      this.router.navigate(["login"]);
    }
    const userId = parseInt(localStorage.getItem('id') || '0', 10); 
    this.expenseService.getExpenses(userId).subscribe(listOfExpenses=>{
      this.expenses = listOfExpenses
    })
  }

  goToAddExpense(): void {
    this.router.navigate(['addExpense']);
  }

}
